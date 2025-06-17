import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, index, onDeleteCard }) => {
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div 
                    className="card" 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    {card.text}
                    <button 
                        className="delete-button" 
                        onClick={() => onDeleteCard(card.id, card.columnId)}>
                        Delete
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Card;
