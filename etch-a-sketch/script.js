// Add configuration constants
const CONFIG = {
    MAX_DIMENSION: 100,
    DEFAULT_DIMENSION: 16,
    OPACITY_STEP: 0.1,
    DEFAULT_OPACITY: '0'
};

// Cache commonly used colors for better performance
const ColorManager = {
    colorCache: new Set(),
    
    getRandomColor() {
        let color;
        do {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        } while (this.colorCache.has(color));
        
        if (this.colorCache.size >= 100) this.colorCache.clear();
        this.colorCache.add(color);
        return color;
    }
};

// Add throttle utility
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Grid Manager Object
const GridManager = {
    currentDimension: CONFIG.DEFAULT_DIMENSION,

    createGrid(container) {
        const fragment = document.createDocumentFragment();
        
        // Create rows and items in a single loop to reduce DOM manipulations
        for (let i = 0; i < this.currentDimension; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row-container');

            for (let j = 0; j < this.currentDimension; j++) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('grid-item');
                itemDiv.style.opacity = CONFIG.DEFAULT_OPACITY;
                rowDiv.appendChild(itemDiv);
            }
            fragment.appendChild(rowDiv);
        }

        container.appendChild(fragment);
    },

    handleGridMouseOver: throttle(function(event) {
        const target = event.target;
        if (!target.classList.contains('grid-item')) return;

        if (!target.classList.contains('painted')) {
            target.classList.add('painted');
            target.style.backgroundColor = ColorManager.getRandomColor();
        }

        const newOpacity = Math.min(
            parseFloat(target.style.opacity || 0) + CONFIG.OPACITY_STEP,
            1
        );
        target.style.opacity = newOpacity;
    }, 16), // Throttle to ~60fps

    setDimensions(dimensions) {
        const parsedDimensions = parseInt(dimensions, 10);
        
        if (isNaN(parsedDimensions)) {
            throw new Error('Dimensions must be a valid number');
        }
        
        if (parsedDimensions < 1 || parsedDimensions > CONFIG.MAX_DIMENSION) {
            throw new Error(`Dimensions must be between 1 and ${CONFIG.MAX_DIMENSION}`);
        }

        this.currentDimension = parsedDimensions;
        this.refreshGrid();
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

    // Set up event listener for mouseover using event delegation
    gridContainer.addEventListener('mouseover', (event) => GridManager.handleGridMouseOver(event));

    // Set up event listener for dimension setting button
    const setDimensionsButton = document.querySelector('#set-dimensions');
    setDimensionsButton.addEventListener('click', () => {
        try {
            let dimensions;
            do {
                dimensions = Number(prompt(
                    `Set a dimension of the grid (1-${CONFIG.MAX_DIMENSION})`,
                    CONFIG.DEFAULT_DIMENSION
                ));
            } while (isNaN(dimensions) || dimensions < 1 || dimensions > CONFIG.MAX_DIMENSION);

            const spanDimensions = document.querySelector('span');
            spanDimensions.textContent = `${dimensions}x${dimensions}`;

            GridManager.setDimensions(dimensions);
        } catch (error) {
            alert(error.message);
        }
    });
});
