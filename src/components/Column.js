import React from 'react';
import Card from './Card';
import AddCard from './AddCard';
import { Droppable } from 'react-beautiful-dnd';

function Column({ column, onAddCard, onDeleteCard }) {
return (
<div className="column">
<h2 className="column-title">{column.title}</h2>
<Droppable droppableId={column.id}>
{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps}>
{column.cards.map((card, index) => (
<Card
key={card.id}
card={card}
columnId={column.id}
onDeleteCard={onDeleteCard}
index={index}
/>
))}
{provided.placeholder}
<AddCard columnId={column.id} onAddCard={onAddCard} />
</div>
)}
</Droppable>
</div>
);
}

export default Column;