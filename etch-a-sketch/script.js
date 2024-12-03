const MAX_DIMENSION = 100; // Maximum dimension for the grid
let currentDimension = 16;  // Default dimension

// Grid Manager Object
const GridManager = {
    createGrid(container) {
        const fragment = document.createDocumentFragment();

        for (let row = 0; row < currentDimension; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row-container');

            for (let column = 0; column < currentDimension; column++) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('grid-item');
                rowDiv.appendChild(itemDiv);
            }

            fragment.appendChild(rowDiv);
        }

        container.appendChild(fragment);
    },

    handleGridMouseOver(event) {
        const target = event.target;

        if (target.classList.contains('grid-item')) {
            target.classList.add('painted');
        }
    },

    setDimensions(dimensions) {
        if (dimensions >= 1 && dimensions <= MAX_DIMENSION) {
            currentDimension = dimensions;
            this.refreshGrid();
        } else {
            alert(`Please enter a number between 1 and ${MAX_DIMENSION}.`);
        }
    },

    refreshGrid() {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = ''; // Clear existing grid
        this.createGrid(gridContainer);
    }
};

// Main execution
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');

    // Create the initial grid
    GridManager.createGrid(gridContainer);
    
    // Set up event listener for mouseover
    gridContainer.addEventListener('mouseover', (event) => GridManager.handleGridMouseOver(event));

    // Set up event listener for dimension setting button
    const setDimensionsButton = document.querySelector('#set-dimensions');
    setDimensionsButton.addEventListener('click', () => {
        let dimensions;
        do {
            dimensions = Number(prompt("Set a dimension of the grid (1-100)", '16'));
        } while (isNaN(dimensions) || dimensions < 1 || dimensions > MAX_DIMENSION);

        const spanDimensions = document.querySelector('span');
        spanDimensions.textContent = `${dimensions}x${dimensions}`;
        
        GridManager.setDimensions(dimensions);
    });
});
