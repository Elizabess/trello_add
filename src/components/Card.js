import React from 'react';

const Card = ({ card, index, onDeleteCard }) => {
    return (
        <div className="card">
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
