import React from 'react';
import Card from './Card'; 
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, onAddCard, onDeleteCard }) => {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <div 
                    className="column" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h2>{column.title}</h2>
                    {column.cards.map((card, index) => (
                        <Card 
                            key={card.id} 
                            card={card} 
                            index={index} 
                            onDeleteCard={onDeleteCard} 
                        />
                    ))}
                    {provided.placeholder}
                    <button onClick={() => onAddCard(column.id, prompt('Enter card text'))}>
                        Add Card
                    </button>
                </div>
            )}
        </Droppable>
    );
};

export default Column;
