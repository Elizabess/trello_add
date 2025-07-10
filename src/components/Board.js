import React, { useState } from 'react';
import Column from './Column';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, setBoard }) {
    const [draggedCard, setDraggedCard] = useState(null);
    const [sourceColumnId, setSourceColumnId] = useState(null);

    const handleDragStart = (cardId, columnId) => {
        setDraggedCard(cardId);
        setSourceColumnId(columnId);
        // Сохраняем информацию о переносимой карточке
        event.dataTransfer.setData('text/plain', cardId);
        event.dataTransfer.setData('sourceColumnId', columnId);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Разрешаем сброс карточки
    };

    const handleDrop = (event, targetColumnId) => {
        event.preventDefault();
        if (!draggedCard || !sourceColumnId) return;

        const newColumns = [...board.columns];

        // Находим исходную и целевую колонки
        const sourceColumn = newColumns.find(col => col.id === sourceColumnId);
        const destColumn = newColumns.find(col => col.id === targetColumnId);

        // Удаляем карточку из исходной колонки
        const [movedCard] = sourceColumn.cards.filter(card => card.id === draggedCard);
        sourceColumn.cards = sourceColumn.cards.filter(card => card.id !== draggedCard);

        // Добавляем карточку в целевую колонку
        destColumn.cards.push(movedCard);

        // Обновляем состояние доски
        setBoard({ ...board, columns: newColumns });

        // Сбрасываем состояние перетаскивания
        setDraggedCard(null);
        setSourceColumnId(null);
    };

    return (
        <div className="board">
            {board.columns.map(column => (
                <div
                    key={column.id} 
                    onDragOver={handleDragOver} 
                    onDrop={(event) => handleDrop(event, column.id)}
                >
                    <Column 
                        column={column}
                        onAddCard={onAddCard} 
                        onDeleteCard={onDeleteCard}
                        onDragStart={handleDragStart}
                    />
                </div>
            ))}
        </div>
    );
}

export default Board;
