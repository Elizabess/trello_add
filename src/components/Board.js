import React from 'react';
import Column from './Column';
import AddCard from './AddCard';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, onDragEnd }) {

    return (    
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                {board.columns.map(column => (
                <Column key={column.id} column={column}
                onAddCard={onAddCard} onDeleteCard={onDeleteCard}/>
                ))}
            </div>
        </DragDropContext>
    );
}

export default Board;