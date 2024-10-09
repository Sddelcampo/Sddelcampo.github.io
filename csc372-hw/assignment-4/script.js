"use strict";

// Select all images with the class "play"
const plays = document.querySelectorAll(".play");
const computerChoiceImage = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const playAgainButton = document.getElementById("play-again");

// Data choices for computer plays
const choices = {
    rock: {
        image: "images/rock.PNG",
        alt: "Rock"
    },
    paper: {
        image: "images/paper.PNG",
        alt: "Paper"
    },
    scissors: {
        image: "images/scissors.PNG",
        alt: "Scissors"
    }
};

// Tracks player and computer and players turn where images are shuffled
let isPlaying = true;
let isThinking = false;
let shuffleIntervalId;

for (let i = 0; i < plays.length; i++) {
    plays[i].addEventListener("click", onClick);
}

/**
   * When the image is clicked removes any border and adds solid red border is applied to the 
   * clicked image but also triggers the computer to start thinking and shuffling results to be 
   * displayed. Also the data on what the object selected is placed into a variable.
   */
function onClick() {
    if (!isPlaying || isThinking) return; // Prevent playing if not in play mode or if thinking

    for (let i = 0; i < plays.length; i++) {
        plays[i].style.border = "none";
    }

    const playing = event.currentTarget;
    playing.style.border = "5px solid red";

    const playerChoice = playing.getAttribute("data-choice");

    computerThinking(playerChoice);
}


/**
   * Computer shuffles throughout the options for an interval of 3000 millisecond (or 3 seconds)
   * where at ,5 second intervals the object changes to a random image. After the three seconds
   * have passed the event to trigger result is called.
   * @param {data-choice} playerChoice takes data from data-choice to compare with computer results
   */
function computerThinking(playerChoice) {
    isThinking = true;
    let thinkingTime = 3000;
    let shuffleInterval = 500;
    let shuffleCounter = 0;

    //Changes image during shuffling
    shuffleIntervalId = setInterval(() => {
        const randomChoice = getComputerChoice();
        computerChoiceImage.src = choices[randomChoice].image;
        computerChoiceImage.alt = "Computer's Turn: " + choices[randomChoice].alt; 
        shuffleCounter += shuffleInterval;

        // Stop shuffling and calls event to display results
        if (shuffleCounter >= thinkingTime) {
            clearInterval(shuffleIntervalId);
            const finalChoice = getComputerChoice();
            displayResult(playerChoice, finalChoice);
        }
    }, shuffleInterval);
}

/**
   * Computer gathers the final choice that will be compared to display the final result of rock,
   * paper, scissors
   */
function getComputerChoice() {
    const keys = Object.keys(choices);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

/**
   * Displays final result of computer and play and determines final result of the games and
   * displays to user.
   * @param {data-choice} player choice of player turn
   * @param {choices} computer choice of computer
   */
function displayResult(player, computer) {
    
    computerChoiceImage.src = choices[computer].image;
    computerChoiceImage.alt = "Computer's Turn: " + choices[computer].alt;
    computerChoiceImage.style.border = "5px solid blue";

    const result = determineWinner(player, computer);

    resultText.textContent = result;
    isPlaying = false;
}

/**
   * Calculates whether player or computer wins or loses using the rules of rock paper scissors
   * where:
   * Rock beats Scissor
   * Scissor beats Paper
   * Paper beats Rock
   * Afterward result is returned for displaying
   * @param {data-choice} player choice of player turn
   * @param {choices} computer choice of computer
   */
function determineWinner(player, computer) {
    if (player === computer) {
        return "Draw!";
    } 
    else if 
    ( (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")) 
    {
        return "You Win!";
    } 
    else {
        return "Computer Wins!";
    }
}

// Reset game when play again is clicked
playAgainButton.addEventListener("click", playAgain);

/**
   * When the play again button is pressed, no matter if shuffling or not, the game resets to its 
   * original state and allows for replaying the game.
    */

function playAgain() {

    // Stops shuffling if it is in the middle of shuffling when play again is pressed
    clearInterval(shuffleIntervalId);

    for (let i = 0; i < plays.length; i++) {
        plays[i].style.border = "none";
    }

    computerChoiceImage.src = "images/question-mark.PNG";
    computerChoiceImage.alt = "Computer's Turn";
    resultText.textContent = "";
    computerChoiceImage.style.border = "none";

    // Restarts playing state
    isPlaying = true;
    isThinking = false;
}
