import React from 'react';
import deleteIcon from '../assets/icons/delete.svg';
import { Draggable } from 'react-beautiful-dnd';

function Card({ card, columnId, onDeleteCard, index }) {
    const handleDeleteClick = (event) => {
        event.stopPropagation(); 
        onDeleteCard(card.id, columnId);
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    className="card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="card-content">{card.text}</div>
                    <button className="delete-button" onClick={handleDeleteClick}>
                        <img src={deleteIcon} alt="Delete" />
                    </button>
                </div>
            )}
        </Draggable>
    );
}

export default Card;
