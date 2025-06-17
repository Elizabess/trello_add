import React from 'react';
import Card from './Card'; 
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Column = ({ column, onAddCard, onDeleteCard }) => {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === result.destination.droppableId) {
            const newCards = Array.from(column.cards);
            const [movedCard] = newCards.splice(result.source.index, 1); // Удаляем карточку из старой позиции
            newCards.splice(result.destination.index, 0, movedCard); // Вставляем карточку в новую позицию
        }
    };

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
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Card 
                                        card={{ ...card, columnId: column.id}} 
                                        index={index} 
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
