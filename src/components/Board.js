import React, { useState } from 'react';
import Column from './Column';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, setBoard }) {
    const [draggedCard, setDraggedCard] = useState(null);
    const [sourceColumnId, setSourceColumnId] = useState(null);

    const handleDragStart = (event, cardId, columnId) => {
        setDraggedCard(cardId);
        setSourceColumnId(columnId);
        event.dataTransfer.setData('text/plain', cardId);
        event.dataTransfer.setData('sourceColumnId', columnId);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, targetColumnId) => {
        event.preventDefault();
        if (!draggedCard || !sourceColumnId) return;

        setBoard(prevBoard => {
            const newColumns = prevBoard.columns.map(column => {
                if (column.id === sourceColumnId) {
                    return {
                        ...column,
                        cards: column.cards.filter(card => card.id !== draggedCard),
                    };
                }
                if (column.id === targetColumnId) {
                    const movedCard = prevBoard.columns
                        .find(col => col.id === sourceColumnId)
                        ?.cards.find(card => card.id === draggedCard);

                    if (!movedCard) return column; // Если карточка не найдена

                    return {
                        ...column,
                        cards: [...column.cards, movedCard],
                    };
                }
                return column;
            });

            return { ...prevBoard, columns: newColumns };
        });

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
                        onDragStart={(event, cardId) => handleDragStart(event, cardId, column.id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default Board;
