import React, { useState } from 'react';
import Column from './Column';
import '../styles/main.css';

function Board({ board, onAddCard, onDeleteCard, setBoard }) {
    const [draggedCard, setDraggedCard] = useState(null);
    const [sourceColumnId, setSourceColumnId] = useState(null);

    const moveCard = (sourceColumnId, targetColumnId, cardId) => {
    if (sourceColumnId === targetColumnId) {
        return;
    }

    setBoard(prevBoard => {
        let movedCard;
        const newColumns = prevBoard.columns.map(column => {
            if (column.id === sourceColumnId) {
                const cardIndex = column.cards.findIndex(card => card.id === cardId);
                if (cardIndex > -1) {
                    movedCard = column.cards[cardIndex];
                    return {
                        ...column,
                        cards: column.cards.filter(card => card.id !== cardId)
                    };
                }
            }
            return column;
        });
        
        if (movedCard) {
            return {
                ...prevBoard,
                columns: newColumns.map(column => {
                    if (column.id === targetColumnId) {
                        return {
                            ...column,
                            cards: [...column.cards, movedCard]
                        };
                    }
                    return column;
                })
            };
        }

        return prevBoard;
    });
};

    
    return (
        <div className="board">
            {board.columns.map(column => (
                <div key={column.id}>
                    <Column 
                        column={column}
                        onAddCard={onAddCard} 
                        onDeleteCard={onDeleteCard}
                        moveCard={moveCard} 
                    />
                </div>
            ))}
        </div>
    );

}

export default Board;
