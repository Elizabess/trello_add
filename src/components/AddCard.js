import React, { useState } from 'react';

function AddCard({ columnId, onAddCard }) {
const [isAdding, setIsAdding] = useState(false);
const [cardText, setCardText] = useState('');

const handleAddClick = () => {
setIsAdding(true);
};

const handleSaveClick = () => {
if (cardText.trim()) {
onAddCard(columnId, cardText);
setCardText('');
}
setIsAdding(false);
};

const handleCancelClick = () => {
setIsAdding(false);
setCardText('');
};

const handleTextChange = (e) => {
setCardText(e.target.value);
};

return (
<div className="add-card-container">
{isAdding ? (
<div className="add-card-form">
<textarea
className="add-card-textarea"
value={cardText}
onChange={handleTextChange}
placeholder="Enter a title for this card..."
/>
<div className="add-card-buttons">
<button className="save-button" onClick={handleSaveClick}>
Save
</button>
<button className="cancel-button" onClick={handleCancelClick}>
Cancel
</button>
</div>
</div>
) : (
<button className="add-card-button" onClick={handleAddClick}>
+ Add another card
</button>
)}
</div>
);
}

export default AddCard;