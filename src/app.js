import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { loadState, saveState } from './utils/localStorage';
import './styles/reset.css';
import './styles/main.css';

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
cards: [...column.cards, { id: Math.random().toString(), text: text }], // Уникальный id
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
if (!result.destination) {
return;
}

const { source, destination, draggableId } = result;

setBoard(prevBoard => {
const newColumns = [...prevBoard.columns];
const sourceColumn = newColumns.find(col => col.id === source.droppableId);
const destinationColumn = newColumns.find(col => col.id === destination.droppableId);

const draggedCard = sourceColumn.cards.find(card => card.id === draggableId);

// Удаляем карточку из исходной колонки
sourceColumn.cards = sourceColumn.cards.filter(card => card.id !== draggableId);

// Добавляем карточку в целевую колонку
destinationColumn.cards.splice(destination.index, 0, draggedCard);

return { ...prevBoard, columns: newColumns };
});
};

return (
<div className="app-container">
<Board
board={board}
onAddCard={handleAddCard}
onDeleteCard={handleDeleteCard}
onDragEnd={handleDragEnd}
/>
</div>
);
}

export default App;