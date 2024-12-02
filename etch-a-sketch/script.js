const MAX_ROW = 20;
const MAX_COLUMN = 20;

// Function to create a grid of boxes
const createGrid = (container) => {
    const fragment = document.createDocumentFragment();

    for (let row = 0; row < MAX_ROW; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row-container');

        for (let column = 0; column < MAX_COLUMN; column++) {
            const boxDiv = document.createElement('div');
            boxDiv.classList.add('box');
            rowDiv.appendChild(boxDiv);
        }

        fragment.appendChild(rowDiv);
    }

    container.appendChild(fragment);
};

// Function to handle mouseover event on boxes
const handleBoxMouseOver = (event) => {
    const target = event.target;

    if (target.classList.contains('box')) {
        target.classList.add('painted');
    }
};

// Main execution
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');

    // Create the grid and set up the event listener
    createGrid(gridContainer);
    gridContainer.addEventListener('mouseover', handleBoxMouseOver);
});
