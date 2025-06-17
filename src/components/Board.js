import React from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, setBoard }) {
    const handleDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const newColumns = [...board.columns];
        const sourceColumn = newColumns.find(col => col.id === source.droppableId);
        const destColumn = newColumns.find(col => col.id === destination.droppableId);
        
        const [movedCard] = sourceColumn.cards.splice(source.index, 1);
        destColumn.cards.splice(destination.index, 0, movedCard);

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
