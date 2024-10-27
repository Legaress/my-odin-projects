// Mapping of string choices to numerical values for game logic
const itemToNumber = {
    "rock": 0,
    "paper": 1,
    "scissors": 2,
}

// Mapping of numerical values back to string choices for display
const numberToItem = {
    0: "rock",
    1: "paper",
    2: "scissors",
}

// Game scoring configuration
const WINNING_SCORE = 500;  // Points needed to win the game
const POINTS_WIN = 100;     // Points awarded for winning a round
const POINTS_TIE = 50;      // Points awarded for a tie round

// 2. initGame()
let humanScore;
let computerScore;

const playGame = () => {
    humanScore = 0;
    computerScore = 0;
    
    while (humanScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
        const humanChoice = getHumanChoice();
        if (!humanChoice) {
            break;  // Player cancelled
        }
        
        const computerChoice = getComputerChoice();
        playRound(itemToNumber[humanChoice], computerChoice);
        displayScore();
    }
    
    printFinalResults();
}

// getHumanChoice()
const getHumanChoice = () => {
    let keepGoing = true;
    let result;
    while (keepGoing) {
        result = prompt("Enter your choice: rock, paper or scissors");
        if (!result)
            keepGoing = false;
        else {
            result = result.toLowerCase();
            if (result === "rock" || result === "paper" || result === "scissors") {
                keepGoing = false;
            }
        }
    }
    return result;
}

// getComputerChoice()
const getComputerChoice = () => {
    return Math.floor(Math.random() * 3);
}

// Game outcome matrix: graphGame[playerChoice][computerChoice]
// Returns: 1 (player wins), -1 (computer wins), 0 (tie)
const graphGame = [
    [0, -1, 1],  // Rock:     Tie vs Rock, Lose vs Paper, Win vs Scissors
    [1, 0, -1],  // Paper:    Win vs Rock, Tie vs Paper, Lose vs Scissors
    [-1, 1, 0]   // Scissors: Lose vs Rock, Win vs Paper, Tie vs Scissors
]

// playRound()
const playRound = (humanChoice, computerChoice) => {
    const result = graphGame[humanChoice][computerChoice];
    const humanMove = numberToItem[humanChoice];
    const computerMove = numberToItem[computerChoice];
    
    let message = `🎮 Your choice: ${humanMove}\n🤖 Computer's choice: ${computerMove}\n\n`;
    
    if (result === 0) {
        humanScore += POINTS_TIE;
        computerScore += POINTS_TIE;
        message += "🤝 It's a tie!";
    } else if (result === 1) {
        humanScore += POINTS_WIN;
        message += "🎉 You win this round!";
    } else {
        computerScore += POINTS_WIN;
        message += "💻 Computer wins this round!";
    }
    
    alert(message);
}

// Add new function to display current score
const displayScore = () => {
    alert(`📊 Current Score:\n👤 You: ${humanScore}\n🤖 Computer: ${computerScore}`);
}

// Add new function to display final results
const printFinalResults = () => {
    let message = "🏁 Game Over!\n\n";
    message += `🏆 Final Score:\n👤 You: ${humanScore}\n🤖 Computer: ${computerScore}\n\n`;
    message += humanScore > computerScore ? "🎉 You win the game!" :
               humanScore === computerScore ? "🤝 It's a tie game!" :
               "💻 Computer wins the game!";
    alert(message);
}

playGame();
