let playerscore = 0;
let computerscore = 0;
const winningscore = 10; // Limit to win (first to 10)
let gameover = false; // Track if the game has ended

let playertext = document.getElementById("playertext");
let computertext = document.getElementById("computertext");
let resulttext = document.getElementById("resulttext");
let resetbutton = document.getElementById("resetbutton");
let scoretext = document.getElementById("scoretext");
let choicebutton = document.querySelectorAll(".choicebutton"); 

let player;
let computer;
let result;

choicebutton.forEach(button => button.addEventListener("click", () => {
    if (gameover) return; // Prevent clicking after game ends

    player = button.textContent;
    computerturn();
    playertext.textContent = `Player: ${player}`; 
    computertext.textContent = `Computer: ${computer}`;
    resulttext.textContent = checkwinner();
}));

function computerturn() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;

    switch (randomNumber) {
        case 1:
            computer = "ROCK✊";
            break;
        case 2:
            computer = "PAPER🖐";
            break;
        case 3:
            computer = "SCISSORS✂";
            break;
    }
}

function checkwinner() {
    if (gameover) return "";

    if (player === computer) {
        return "DRAW!";
    } else if (computer === "ROCK✊" && player === "PAPER🖐") {
        playerscore++;
    } else if (computer === "ROCK✊" && player === "SCISSORS✂") {
        computerscore++;
    } else if (computer === "PAPER🖐" && player === "ROCK✊") {
        computerscore++;
    } else if (computer === "PAPER🖐" && player === "SCISSORS✂") {
        playerscore++;
    } else if (computer === "SCISSORS✂" && player === "ROCK✊") {
        playerscore++;
    } else if (computer === "SCISSORS✂" && player === "PAPER🖐") {
        computerscore++;
    }

    updatescore();

    return checkgameover(); // 🔹 Check if someone reached 10 points
}

function updatescore() {
    scoretext.textContent = `Player: ${playerscore} | Computer: ${computerscore}`;
}

// 🔹 Check if the game is over
function checkgameover() {
    if (playerscore >= winningscore) {
        gameover = true;
        disableButtons();
        return "🎉 YOU WIN THE GAME! 🎉";
    } else if (computerscore >= winningscore) {
        gameover = true;
        disableButtons();
        return "😢 COMPUTER WINS THE GAME! 😢";
    } else {
        return "";
    }
}

// 🔹 Disable buttons when the game is over
function disableButtons() {
    choicebutton.forEach(button => button.disabled = true);
}

// 🔹 Reset the game when clicking the reset button
resetbutton.addEventListener("click", () => {
    playerscore = 0;
    computerscore = 0;
    gameover = false; // 🔹 Reset game state

    playertext.textContent = "PLAYER: ";
    computertext.textContent = "COMPUTER: ";
    resulttext.textContent = "RESULT: ";
    updatescore();

    // 🔹 Enable buttons again
    choicebutton.forEach(button => button.disabled = false);
});
