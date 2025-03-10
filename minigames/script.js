// Tic-Tac-Toe Game with Auto Reset & Score Tracking
let ticTacToeScore = { X: 0, O: 0, draws: 0 };

function startTicTacToe() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Tic-Tac-Toe</h2>
        <button onclick="setGameMode('player')">Play Against a Friend</button>
        <button onclick="setGameMode('computer')">Play Against Computer</button>
        <div class="tic-tac-toe">
            <div class="row">
                <button class="cell" onclick="makeMove(0)"></button>
                <button class="cell" onclick="makeMove(1)"></button>
                <button class="cell" onclick="makeMove(2)"></button>
            </div>
            <div class="row">
                <button class="cell" onclick="makeMove(3)"></button>
                <button class="cell" onclick="makeMove(4)"></button>
                <button class="cell" onclick="makeMove(5)"></button>
            </div>
            <div class="row">
                <button class="cell" onclick="makeMove(6)"></button>
                <button class="cell" onclick="makeMove(7)"></button>
                <button class="cell" onclick="makeMove(8)"></button>
            </div>
        </div>
        <p id="game-status"></p>
        <p>Score: X - <span id="score-x">0</span> | O - <span id="score-o">0</span> | Draws - <span id="score-draws">0</span></p>
    `;
    resetGame();
}

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "player";

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.querySelectorAll(".cell")[index].textContent = currentPlayer;
        checkWinner();
        if (gameActive && gameMode === "computer" && currentPlayer === "O") {
            setTimeout(computerMove, 500);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function computerMove() {
    let availableMoves = board.map((val, idx) => (val === "" ? idx : null)).filter(val => val !== null);
    if (availableMoves.length > 0) {
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(randomMove);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById("game-status").textContent = `${board[a]} Wins!`;
            ticTacToeScore[board[a]]++;
            updateScore();
            setTimeout(resetGame, 2000);
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        document.getElementById("game-status").textContent = "It's a Draw!";
        ticTacToeScore.draws++;
        updateScore();
        setTimeout(resetGame, 2000);
    }
}

function updateScore() {
    document.getElementById("score-x").textContent = ticTacToeScore.X;
    document.getElementById("score-o").textContent = ticTacToeScore.O;
    document.getElementById("score-draws").textContent = ticTacToeScore.draws;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("game-status").textContent = "";
    document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    if (gameMode === "computer" && currentPlayer === "O") {
        computerMove();
    }
}

// Rock, Paper, Scissors Game with Score Tracker
let rpsScore = { player: 0, computer: 0, ties: 0 };

function startRockPaperScissors() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Rock, Paper, Scissors</h2>
        <p>Choose your move:</p>
        <button onclick="playRPS('rock')">🪨 Rock</button>
        <button onclick="playRPS('paper')">📜 Paper</button>
        <button onclick="playRPS('scissors')">✂️ Scissors</button>
        <p id="rps-result"></p>
        <p>Score: You - <span id="player-score">0</span> | Computer - <span id="computer-score">0</span> | Ties - <span id="tie-score">0</span></p>
    `;
}

function playRPS(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "";
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
        rpsScore.ties++;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You Win!";
        rpsScore.player++;
    } else {
        result = "Computer Wins!";
        rpsScore.computer++;
    }

    document.getElementById("rps-result").textContent = `Computer chose ${computerChoice}. ${result}`;
    document.getElementById("player-score").textContent = rpsScore.player;
    document.getElementById("computer-score").textContent = rpsScore.computer;
    document.getElementById("tie-score").textContent = rpsScore.ties;

    setTimeout(startRockPaperScissors, 2000); // Auto-reset after 2 seconds
}
// Number Guessing Game with Score Tracker
let guessingGameScore = { wins: 0, attempts: 0 };
let secretNumber;

function startNumberGuessing() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessingGameScore.attempts = 0;

    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Guess the Number</h2>
        <p>Pick a number between 1 and 100</p>
        <input type="number" id="guess-input" min="1" max="100">
        <button onclick="checkGuess()">Guess</button>
        <p id="guess-result"></p>
        <p>Wins: <span id="win-score">0</span> | Attempts: <span id="attempt-score">0</span></p>
    `;
}

function checkGuess() {
    const guess = parseInt(document.getElementById("guess-input").value);
    guessingGameScore.attempts++;

    let resultMessage;
    if (guess < secretNumber) {
        resultMessage = "Too Low! Try again!";
    } else if (guess > secretNumber) {
        resultMessage = "Too High! Try again!";
    } else {
        resultMessage = "🎉 Correct! You Win!";
        guessingGameScore.wins++;
        document.getElementById("win-score").textContent = guessingGameScore.wins;
        setTimeout(startNumberGuessing, 2000); // Reset game after 2 seconds
    }

    document.getElementById("guess-result").textContent = resultMessage;
    document.getElementById("attempt-score").textContent = guessingGameScore.attempts;
}
// Reaction Speed Test Game

function startReactionSpeedGame() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = "<h2>Reaction Speed Game</h2><p>Click the button as fast as you can when it turns green!</p><button id='reactionButton' disabled>Wait...</button><p id='reactionTime'></p>";
    
    const reactionButton = document.getElementById("reactionButton");
    const reactionTimeDisplay = document.getElementById("reactionTime");
    
    let startTime;
    
    setTimeout(() => {
        reactionButton.textContent = "CLICK NOW!";
        reactionButton.disabled = false;
        startTime = Date.now();
    }, Math.random() * 3000 + 2000);
    
    reactionButton.addEventListener("click", () => {
        const endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000;
        reactionTimeDisplay.textContent = `Your reaction time: ${reactionTime} seconds`;
        reactionButton.disabled = true;
    });
}

let reactionGameScore = { bestTime: null, roundsPlayed: 0 };
let reactionStartTime;

function startReactionGame() {
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Reaction Speed Test</h2>
        <p>Wait for the "Click Now!" message and tap as fast as possible!</p>
        <button id="start-reaction-btn" onclick="waitForSignal()">Start</button>
        <p id="reaction-message"></p>
        <p id="reaction-time"></p>
        <p>Best Time: <span id="best-time">-</span> | Rounds Played: <span id="rounds-played">0</span></p>
    `;
}

function waitForSignal() {
    document.getElementById("start-reaction-btn").style.display = "none";
    document.getElementById("reaction-message").textContent = "Wait for it...";
    
    let randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 sec delay
    setTimeout(() => {
        reactionStartTime = new Date().getTime();
        document.getElementById("reaction-message").textContent = "CLICK NOW!";
        document.getElementById("game-area").onclick = recordReactionTime;
    }, randomDelay);
}

function recordReactionTime() {
    if (!reactionStartTime) return;
    
    let reactionTime = new Date().getTime() - reactionStartTime;
    reactionStartTime = null;
    
    document.getElementById("reaction-message").textContent = `Your reaction time: ${reactionTime}ms`;
    
    reactionGameScore.roundsPlayed++;
    if (!reactionGameScore.bestTime || reactionTime < reactionGameScore.bestTime) {
        reactionGameScore.bestTime = reactionTime;
    }

    document.getElementById("best-time").textContent = reactionGameScore.bestTime + "ms";
    document.getElementById("rounds-played").textContent = reactionGameScore.roundsPlayed;

    setTimeout(startReactionGame, 3000); // Reset game after 3 seconds
}

// Memory Card Matching Game
let memoryGame = {
    cards: ["🍕", "🍕", "🎸", "🎸", "🚀", "🚀", "🐱", "🐱", "🎩", "🎩", "💎", "💎"],
    flippedCards: [],
    matchedPairs: 0,
    roundsPlayed: 0
};

function startMemoryGame() {
    shuffle(memoryGame.cards);
    memoryGame.flippedCards = [];
    memoryGame.matchedPairs = 0;
    memoryGame.roundsPlayed++;

    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Memory Card Matching</h2>
        <p>Match all pairs as fast as possible!</p>
        <div id="memory-board" class="memory-board"></div>
        <p>Rounds Played: <span id="memory-rounds">0</span></p>
    `;

    const board = document.getElementById("memory-board");
    memoryGame.cards.forEach((emoji, index) => {
        let card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.index = index;
        card.onclick = () => flipCard(card, emoji);
        board.appendChild(card);
    });

    updateScore();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard(card, emoji) {
    if (memoryGame.flippedCards.length < 2 && !card.classList.contains("matched")) {
        card.textContent = emoji;
        memoryGame.flippedCards.push({ card, emoji });

        if (memoryGame.flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

function checkMatch() {
    let [card1, card2] = memoryGame.flippedCards;

    if (card1.emoji === card2.emoji) {
        card1.card.classList.add("matched");
        card2.card.classList.add("matched");
        memoryGame.matchedPairs++;

        if (memoryGame.matchedPairs === memoryGame.cards.length / 2) {
            setTimeout(() => {
                alert("You matched all pairs! 🎉 Restarting...");
                startMemoryGame();
            }, 1000);
        }
    } else {
        card1.card.textContent = "";
        card2.card.textContent = "";
    }

    memoryGame.flippedCards = [];
}

function updateScore() {
    document.getElementById("memory-rounds").textContent = memoryGame.roundsPlayed;
}
// Maze Escape Game
let mazeGame = {
    size: 10,
    player: { x: 0, y: 0 },
    exit: { x: 9, y: 9 },
    maze: [],
    attempts: 0
};

function startMazeGame() {
    mazeGame.player = { x: 0, y: 0 };
    mazeGame.exit = { x: mazeGame.size - 1, y: mazeGame.size - 1 };
    mazeGame.attempts++;
    generateMaze();

    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Maze Escape</h2>
        <p>Use arrow keys to reach the 🏁 exit!</p>
        <div id="maze-board" class="maze-board"></div>
        <p>Attempts: <span id="maze-attempts">0</span></p>
    `;

    updateMaze();
    document.addEventListener("keydown", movePlayer);
}

function generateMaze() {
    mazeGame.maze = Array.from({ length: mazeGame.size }, () =>
        Array.from({ length: mazeGame.size }, () => (Math.random() > 0.7 ? "🧱" : "⬜"))
    );

    mazeGame.maze[0][0] = "🟢"; // Player start
    mazeGame.maze[mazeGame.exit.y][mazeGame.exit.x] = "🏁"; // Exit
}

function updateMaze() {
    const board = document.getElementById("maze-board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${mazeGame.size}, 40px)`;

    for (let y = 0; y < mazeGame.size; y++) {
        for (let x = 0; x < mazeGame.size; x++) {
            let cell = document.createElement("div");
            cell.classList.add("maze-cell");
            cell.textContent = mazeGame.maze[y][x];
            board.appendChild(cell);
        }
    }

    document.getElementById("maze-attempts").textContent = mazeGame.attempts;
}

function movePlayer(event) {
    let { x, y } = mazeGame.player;
    if (event.key === "ArrowUp" && y > 0) y--;
    if (event.key === "ArrowDown" && y < mazeGame.size - 1) y++;
    if (event.key === "ArrowLeft" && x > 0) x--;
    if (event.key === "ArrowRight" && x < mazeGame.size - 1) x++;

    if (mazeGame.maze[y][x] !== "🧱") {
        mazeGame.maze[mazeGame.player.y][mazeGame.player.x] = "⬜";
        mazeGame.player = { x, y };
        mazeGame.maze[y][x] = "🟢";
        updateMaze();
    }

    if (x === mazeGame.exit.x && y === mazeGame.exit.y) {
        setTimeout(() => {
            alert("You escaped the maze! 🎉 Restarting...");
            startMazeGame();
        }, 500);
    }
}
// Speed Click Challenge
let speedClick = {
    score: 0,
    timeLeft: 10,
    gameInterval: null,
};

function startSpeedClickGame() {
    speedClick.score = 0;
    speedClick.timeLeft = 10;

    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
        <h2>Speed Click Challenge</h2>
        <p>Click the target as fast as you can!</p>
        <div id="target" class="click-target"></div>
        <p>Score: <span id="click-score">0</span></p>
        <p>Time Left: <span id="click-timer">10</span>s</p>
    `;

    document.getElementById("target").addEventListener("click", increaseScore);
    moveTarget();
    speedClick.gameInterval = setInterval(updateTimer, 1000);
}

function moveTarget() {
    const target = document.getElementById("target");
    target.style.top = `${Math.random() * 80 + 10}%`;
    target.style.left = `${Math.random() * 80 + 10}%`;
}

function increaseScore() {
    speedClick.score++;
    document.getElementById("click-score").textContent = speedClick.score;
    moveTarget();
}

function updateTimer() {
    speedClick.timeLeft--;
    document.getElementById("click-timer").textContent = speedClick.timeLeft;

    if (speedClick.timeLeft <= 0) {
        clearInterval(speedClick.gameInterval);
        setTimeout(() => {
            alert(`Time's up! Final Score: ${speedClick.score} 🎉 Restarting...`);
            startSpeedClickGame();
        }, 500);
    }
}

// Shadow Runner Game
const shadowRunner = {
    running: false,
    score: 0,
    speed: 5,
    gravity: 0.6,
    jumpPower: -10,
    player: { y: 0, velocity: 0 },
    obstacles: [],
    gameInterval: null,
};

function startShadowRunner() {
    shadowRunner.running = true;
    shadowRunner.score = 0;
    shadowRunner.speed = 5;
    shadowRunner.player.y = 100;
    shadowRunner.player.velocity = 0;
    shadowRunner.obstacles = [];

    document.getElementById("game-area").innerHTML = `
        <h2>Shadow Runner</h2>
        <p>Score: <span id="runner-score">0</span></p>
        <canvas id="runner-canvas" width="600" height="200"></canvas>
    `;

    document.addEventListener("keydown", jumpRunner);
    shadowRunner.gameInterval = setInterval(updateRunnerGame, 30);
}

function jumpRunner(event) {
    if (event.code === "Space" && shadowRunner.player.y === 100) {
        shadowRunner.player.velocity = shadowRunner.jumpPower;
    }
}

function updateRunnerGame() {
    const canvas = document.getElementById("runner-canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    shadowRunner.player.velocity += shadowRunner.gravity;
    shadowRunner.player.y += shadowRunner.player.velocity;
    if (shadowRunner.player.y > 100) shadowRunner.player.y = 100;

    // Draw player
    ctx.fillStyle = "black";
    ctx.fillRect(50, shadowRunner.player.y, 20, 20);

    // Move and draw obstacles
    if (Math.random() < 0.02) {
        shadowRunner.obstacles.push({ x: canvas.width, width: 20, height: 20 });
    }

    for (let i = 0; i < shadowRunner.obstacles.length; i++) {
        shadowRunner.obstacles[i].x -= shadowRunner.speed;
        ctx.fillRect(shadowRunner.obstacles[i].x, 100, shadowRunner.obstacles[i].width, shadowRunner.obstacles[i].height);

        // Check for collision
        if (
            shadowRunner.obstacles[i].x < 70 &&
            shadowRunner.obstacles[i].x > 30 &&
            shadowRunner.player.y >= 100
        ) {
            gameOverShadowRunner();
            return;
        }
    }

    // Remove passed obstacles and update score
    shadowRunner.obstacles = shadowRunner.obstacles.filter((obstacle) => obstacle.x > 0);
    shadowRunner.score++;
    document.getElementById("runner-score").textContent = shadowRunner.score;

    // Increase speed over time
    shadowRunner.speed += 0.001;
}

function gameOverShadowRunner() {
    clearInterval(shadowRunner.gameInterval);
    alert(`Game Over! Your Score: ${shadowRunner.score}. Restarting...`);
    startShadowRunner();
}
