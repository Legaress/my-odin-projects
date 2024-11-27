import { numberToChoice } from "./mappers.js";

export class RockPaperScissorsView {
    constructor() {
        this.playerScoreElement = document.querySelector('#player-score');
        this.opponentScoreElement = document.querySelector('#computer-score');
        this.resultMessageElement = document.querySelector('#result-message');
    }

    updateScoreDisplay(humanScore, computerScore) {
        this.playerScoreElement.textContent = humanScore;
        this.opponentScoreElement.textContent = computerScore;
    }

    updateResultMessage(message) {
        this.resultMessageElement.innerHTML = message;
    }

    displayRoundResults(roundResult,humanChoice,computerChoice) {
        if (roundResult !== null) {
            let message = `🎮 Your choice: ${numberToChoice(humanChoice)}<br>🤖 Computer's choice: ${numberToChoice(computerChoice)}<br>`;
            if (roundResult === "tie") message += "🤝 It's a tie!";
            else if (roundResult === "win") message += "🎉 You win this round!";
            else message += "💻 Computer wins this round!";
            
            this.updateResultMessage(message);
        }
    }

    displayFinalResults(humanScore, computerScore) {
        let message = `🏁 Game Over!<br>🏆 Final Score:<br>👤 You: ${humanScore}<br>🤖 Computer: ${computerScore}<br>`;
        message += humanScore > computerScore ? "🎉 You win the game!" :
                   humanScore === computerScore ? "🤝 It's a tie game!" :
                   "💻 Computer wins the game!";
        this.updateResultMessage(message);
    }
}
