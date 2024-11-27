import { choiceToNumber } from "./mappers.js";

export class RockPaperScissorsModel {
    constructor() {
        this.humanScore = 0;
        this.computerScore = 0;
        this.WINNING_SCORE = 500;
        this.POINTS_WIN = 100;
        this.POINTS_TIE = 50;
        this.gameOutcomeMatrix = [
            [0, -1, 1],  // Rock
            [1, 0, -1],  // Paper
            [-1, 1, 0]   // Scissors
        ];
    }

    initializeGame() {
        this.humanScore = 0;
        this.computerScore = 0;
    }

    getPlayerChoice(choice) {
        return choiceToNumber(choice) !== undefined ? choiceToNumber(choice) : null;
    }

    getComputerChoice() {
        return Math.floor(Math.random() * 3);
    }

    playRound(humanChoice, computerChoice) {
        if (humanChoice === null) return null;

        const result = this.gameOutcomeMatrix[humanChoice][computerChoice];

        if (result === 0) {
            this.humanScore += this.POINTS_TIE;
            this.computerScore += this.POINTS_TIE;
            return "tie";
        } else if (result === 1) {
            this.humanScore += this.POINTS_WIN;
            return "win";
        } else {
            this.computerScore += this.POINTS_WIN;
            return "lose";
        }
    }

    checkIfGameOver() {
        return this.humanScore >= this.WINNING_SCORE || this.computerScore >= this.WINNING_SCORE;
    }
}
