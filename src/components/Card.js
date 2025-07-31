import React from 'react';

const Card = ({ card, index, onDeleteCard, onDragStart }) => {
    const handleDragStart = (e) => {
        // Убедитесь, что передаете card.id и index
        onDragStart(e, card.id, index);
    };

    return (
        <div 
            className="card" 
            draggable 
            onDragStart={handleDragStart}
        >
            {card.text}
            <button 
                className="delete-button" 
                onClick={() => onDeleteCard(card.id, card.columnId)}
            >
                Delete
            </button>
        </div>
    );
};

export default Card;
