export class RockPaperScissorsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize event listeners
        const playerSelectionElement = document.querySelector('.image-container');
        playerSelectionElement.addEventListener('click', (e) => this.handlePlayerSelection(e));
        
        // Initialize the game
        this.model.initializeGame();
        this.view.updateScoreDisplay(this.model.humanScore, this.model.computerScore);
    }

    handlePlayerSelection(e) {
        const humanChoice = this.model.getPlayerChoice(e.target.closest('button')?.id);
        const computerChoice = this.model.getComputerChoice();
        
        const roundResult = this.model.playRound(humanChoice, computerChoice);
        this.view.displayRoundResults(roundResult,humanChoice,computerChoice);

            if (this.model.checkIfGameOver()) {
                this.view.displayFinalResults(this.model.humanScore, this.model.computerScore);
                this.model.initializeGame(); // Reset scores for a new game
                this.view.updateScoreDisplay(this.model.humanScore, this.model.computerScore);
            } else {
                this.view.updateScoreDisplay(this.model.humanScore, this.model.computerScore);
            }
        }
    }

