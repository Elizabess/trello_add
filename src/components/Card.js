import React from 'react';

const Card = ({ card, index, onDeleteCard, onDragStart }) => {
    return (
        <div 
            className="card" 
            draggable 
            onDragStart={(e) => onDragStart(e, card.id, index)}
        >
            {card.text}
            <button 
                className="delete-button" 
                onClick={() => onDeleteCard(card.id, card.columnId)}>
                Delete
            </button>
        </div>
    );
};

export default Card;
