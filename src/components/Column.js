import React, { useCallback, useMemo } from 'react';
import Card from './Card';

const Column = ({ column, onAddCard, onDeleteCard }) => {
    const handleAddCard = () => {
        const text = prompt('Введите текст карточки:');
        if (text) {
            onAddCard(column.id, text);
        }
    };

    const handleDragStateChange = useCallback((event, isEntering) => {
        if (isEntering) {
            event.currentTarget.classList.add('drag-over');
        } else {
            event.currentTarget.classList.remove('drag-over');
        }
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData('text/plain');
        const sourceColumnId = event.dataTransfer.getData('sourceColumnId');

        if (cardId && sourceColumnId && sourceColumnId !== column.id) {
            // Здесь должна быть логика перемещения карточки
            // moveCard(sourceColumnId, column.id, cardId);
        }
    }, [column.id]);

    const renderedCards = useMemo(() => (
        column.cards.map((card) => (
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
        ))
    ), [column.cards, column.id, onDeleteCard]);

    return (
        <div 
            className="column" 
            onDragOver={(event) => event.preventDefault()} 
            onDrop={handleDrop} 
            onDragEnter={(event) => handleDragStateChange(event, true)}
            onDragLeave={(event) => handleDragStateChange(event, false)}
        >
            <h2>{column.title}</h2>
            <button onClick={handleAddCard}>Добавить карточку</button>
            <div className="cards">
                {renderedCards}
            </div>
        </div>
    );
};

export default Column;
