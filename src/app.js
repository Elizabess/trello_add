import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { loadState, saveState } from './utils/localStorage';
import './styles/reset.css';
import './styles/main.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid'; 

const initialBoardState = {
    columns: [
        { id: 'column1', title: 'To Do', cards: [] },
        { id: 'column2', title: 'In Progress', cards: [] },
        { id: 'column3', title: 'Done', cards: [] },
    ],
};

function App() {
    const [board, setBoard] = useState(() => {
        const storedState = loadState('trelloBoard');
        return storedState || initialBoardState;
    });

    useEffect(() => {
        saveState('trelloBoard', board);
    }, [board]);

    const handleAddCard = (columnId, text) => {
        setBoard(prevBoard => {
            const newColumns = prevBoard.columns.map(column => {
                if (column.id === columnId) {
                    return {
                        ...column,
                        cards: [...column.cards, { id: uuidv4(), text }],
                    };
                }
                return column;
            });
            return { ...prevBoard, columns: newColumns };
        });
    };

    const handleDeleteCard = (cardId, columnId) => {
        setBoard(prevBoard => {
            const newColumns = prevBoard.columns.map(column => {
                if (column.id === columnId) {
                    return {
                        ...column,
                        cards: column.cards.filter(card => card.id !== cardId),
                    };
                }
                return column;
            });
            return { ...prevBoard, columns: newColumns };
        });
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // Если нет назначения, выходим из функции
        if (!destination) {
            return;
        }

        // Если карточка была перетащена в ту же позицию, выходим из функции
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        setBoard(prevBoard => {
            const newColumns = [...prevBoard.columns];

            // Находим исходную и целевую колонки
            const sourceColumn = newColumns.find(col => col.id === source.droppableId);
            const destinationColumn = newColumns.find(col => col.id === destination.droppableId);

            // Находим перетаскиваемую карточку
            const draggedCard = sourceColumn.cards[source.index];

            // Удаляем карточку из исходной колонки
            sourceColumn.cards.splice(source.index, 1);

            // Добавляем карточку в целевую колонку
            destinationColumn.cards.splice(destination.index, 0, draggedCard);

            return { ...prevBoard, columns: newColumns };
        });
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="app-container">
                <Board
                    board={board}
                    onAddCard={handleAddCard}
                    onDeleteCard={handleDeleteCard}
                />
            </div>
        </DragDropContext>
    );
}

export default App;
