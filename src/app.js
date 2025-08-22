import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { loadState, saveState } from './utils/localStorage';
import './styles/reset.css';
import './styles/main.css';
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

    const handleDragStart = (e, cardId) => {
        e.dataTransfer.setData("text/plain", cardId);
    };

    const handleDrop = (e, columnId) => {
    const cardId = e.dataTransfer.getData("text/plain");
    
    if (!cardId) return;

    setBoard(prevBoard => {
        const newColumns = prevBoard.columns.map(column => {
            if (column.id === columnId) {
                const draggedCard = prevBoard.columns
                    .flatMap(col => col.cards)
                    .find(card => card.id === cardId);

                const sourceColumn = prevBoard.columns.find(col => 
                    col.cards.some(card => card.id === cardId)
                );

                const newSourceCards = sourceColumn.cards.filter(card => card.id !== cardId);
                const newTargetCards = [...column.cards, draggedCard];

                return {
                    ...column,
                    cards: newTargetCards,
                };
            }
            if (column.id === sourceColumn.id) {
                return {
                    ...column,
                    cards: newSourceCards,
                };
            }
            return column;
        });
        return { ...prevBoard, columns: newColumns };
    });
};

    return (
        <div className="app-container">
            <Board
                board={board}
                setBoard={setBoard}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
            />
        </div>
    );
}

export default App;
