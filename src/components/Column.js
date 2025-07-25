import React, { useCallback } from 'react';
import Card from './Card';

const Column = ({ column, onAddCard, onDeleteCard, onDropCard }) => {
    const handleDragOver = useCallback((event) => {
        event.preventDefault(); // Разрешаем сброс карточки
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault(); // Предотвращаем действие по умолчанию
        const cardId = event.dataTransfer.getData('text/plain');
        const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

        if (cardId && sourceColumnId) {
            onDropCard(cardId, sourceColumnId, column.id); // Перемещаем карточку
        }
    }, [column.id, onDropCard]);

    const handleDragEnter = useCallback((event) => {
        event.currentTarget.classList.add('drag-over'); // Подсвечиваем колонку
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.currentTarget.classList.remove('drag-over'); // Убираем подсветку
    }, []);

    const handleAddCard = () => {
        const cardText = prompt('Enter card text');
        if (cardText && cardText.trim()) {
            onAddCard(column.id, cardText.trim());
        } else {
            alert('Card text cannot be empty!'); // Уведомление пользователя
        }
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
            <button onClick={handleAddCard}>
                Add Card
            </button>
        </div>
    );
};

export default Column;

