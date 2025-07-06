import React from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, setBoard }) {
    const handleDragEnd = (result) => {
        const { destination, source } = result;

        // Если нет назначения, выходим из функции
        if (!destination) return;

        // Если карточка была перетащена в ту же позицию, выходим из функции
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Создаем новую копию колонок
        const newColumns = [...board.columns];

        // Находим исходную и целевую колонки
        const sourceColumn = newColumns.find(col => col.id === source.droppableId);
        const destColumn = newColumns.find(col => col.id === destination.droppableId);

        // Удаляем карточку из исходной колонки
        const [movedCard] = sourceColumn.cards.splice(source.index, 1);

        // Добавляем карточку в целевую колонку
        destColumn.cards.splice(destination.index, 0, movedCard);

        // Обновляем состояние доски
        setBoard({ ...board, columns: newColumns });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="board">
                {board.columns.map(column => (
                    <Column 
                        key={column.id} 
                        column={column}
                        onAddCard={onAddCard} 
                        onDeleteCard={onDeleteCard}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}

export default Board;
