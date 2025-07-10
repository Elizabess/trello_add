import React from 'react';
import Card from './Card';

const Column = ({ column, onAddCard, onDeleteCard, onDropCard }) => {
    const handleDragOver = (event) => {
        event.preventDefault(); // Разрешаем сброс карточки
    };

    const handleDrop = (event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию
        const cardId = event.dataTransfer.getData('text/plain');
        const sourceColumnId = event.dataTransfer.getData('sourceColumnId');
        onDropCard(cardId, sourceColumnId, column.id); // Перемещаем карточку
    };

    const handleDragEnter = (event) => {
        event.currentTarget.classList.add('drag-over'); // Подсвечиваем колонку
    };

    const handleDragLeave = (event) => {
        event.currentTarget.classList.remove('drag-over'); // Убираем подсветку
    };

    return (
        <div 
            className="column" 
            onDragOver={handleDragOver} 
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <h2>{column.title}</h2>
            {column.cards.map((card) => (
                <div 
                    key={String(card.id)} 
                    draggable 
                    onDragStart={(event) => {
                        event.dataTransfer.setData('text/plain', String(card.id));
                        event.dataTransfer.setData('sourceColumnId', String(column.id));
                    }}
                >
                    <Card 
                        card={{ ...card, columnId: column.id }} 
                        onDeleteCard={onDeleteCard} 
                    />
                </div>
            ))}
            <button onClick={() => {
                const cardText = prompt('Enter card text');
                if (cardText) {
                    onAddCard(column.id, cardText);
                }
            }}>
                Add Card
            </button>
        </div>
    );
};

export default Column;
