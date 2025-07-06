import React from 'react';
import Card from './Card'; 
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ column, onAddCard, onDeleteCard }) => {
    return (
        <Droppable droppableId={String(column.id)}> {/* Приведение к строке */}
            {(provided) => (
                <div 
                    className="column" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h2>{column.title}</h2>
                    {column.cards.map((card, index) => (
                        <Draggable key={String(card.id)} draggableId={String(card.id)} index={index}> {/* Приведение к строке */}
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Card 
                                        card={{ ...card, columnId: column.id }} 
                                        onDeleteCard={onDeleteCard} 
                                    />
                                </div>
                            )}
                        </Draggable>
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
