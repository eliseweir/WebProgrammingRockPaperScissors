// get and display the user's name
function getUserName(event) {
    // get the value from the form
    let username = document.getElementById("name").value;

    // change the user's display and prevent reloading
    let nameDisplay = document.getElementById("person");
    nameDisplay.textContent = username;
    event.preventDefault();
}

// get the user's choice (rock 0, paper 1, scissors 2)
function getUserChoice(event) {
    let checked = document.querySelector('[name="item"]:checked').value;
    event.preventDefault();
    return checked;
}

// get the computer's choice (random)
function getCompChoice() {
    let choice = Math.floor(Math.random() * 3);
    return choice;
}

// compare the two choices and determine a winner
function getWinner(choice1, choice2) {
    // 0  beats  2   beats   1  beats  0
    // (0+2)%3 =2|(2+2)%3 = 1|(1+2)%3 = 0
    if (choice1 == choice2) {
        // tie
        return 0;
    } else if ((choice1 + 2)%3 == choice2) {
        // choice1 wins
        return 1;
    } else {
        // choice2 wins
        return 2;
    }
}

function numberToRPS(number) {
    if (number == 0) {
        return "rock";
    } else if (number == 1) {
        return "paper";
    } else if (number == 2) {
        return "scissors";
    } else {
        return "";
    }
}

function numberToImage(number) {
    if (number == 0) {
        return "./images/rock.png";
    } else if (number == 1) {
        return "./images/paper.png";
    } else if (number == 2) {
        return "./images/scissors.png";
    } else {
        return "./images/clear.png";
    }
}

function numberToWinner(number, name) {
    if (number == 0) {
        return "You tied this round.";
    } else if (number == 1) {
        return `${name} wins this round!`;
    } else if (number == 2) {
        return "Computer wins this round.";
    } else {
        return "";
    }
}

function displayResults(player, comp, winner) {
    let playerImage = document.querySelector("#vs-person img");
    playerImage.src = numberToImage(player);

    let compImage = document.querySelector("#vs-computer img");
    compImage.src = numberToImage(comp);

    let winnerColor = document.querySelector("#vs-winner");
    let winnerText = document.querySelector("#vs-winner h1");
    if (winner == 1) {
        winnerColor.style.backgroundColor = "#99004E";
        winnerText.textContent = "P";
    } else if (winner == 2) {
        winnerColor.style.backgroundColor = "#2B0B80";
        winnerText.textContent = "C";
    } else {
        winnerColor.style.backgroundColor = "rgba(56, 1, 79, 0)";
        winnerText.textContent = "-";
    }
}

function displayWinner(name) {
    if (name == "") {
        name = "Player";
    }
    let outcome = document.getElementById("outcome");
    outcome.innerHTML = `${name} wins the game.<br>Play again?`;

}

function resetGame(event) {
    // put shoot button back
    document.getElementById("shoot").style.display = "initial";

    // reset game display
    document.querySelector("#vs-person img").src = "./images/clear.png";
    document.querySelector("#vs-computer img").src = "./images/clear.png";

    // reset round winner color
    document.getElementById("vs-winner").style.backgroundColor = "rgba(56, 1, 79, 0)";

    // reset leaderboard
    playerScore = 0;
    compScore = 0;
    document.getElementById("score").textContent = "0 - 0";

    // reset winner display
    document.getElementById("outcome").textContent = "";
}

// competition function (runs on submitting RPS)
function compete(event) {
    let userChoice = getUserChoice(event);
    let compChoice = getCompChoice();
    let winner = getWinner(userChoice, compChoice);

    // update player and computer scores
    if (winner == 1) playerScore++;
    else if (winner == 2) compScore++;

    // display the results of that round
    displayResults(userChoice, compChoice, winner);

    // update the scoreboard
    let scoreboard = document.getElementById("score");
    scoreboard.textContent = `${playerScore} - ${compScore}`;

    // if either player has gotten to 3, display the winner
    if (playerScore >= 3) {
        let username = document.getElementById("name").value;
        displayWinner(username);
    } else if (compScore >= 3) displayWinner("Computer");

    // if a player has won, disable "shoot" button
    if (playerScore >= 3 || compScore >= 3) {
        document.getElementById("shoot").style.display = "none";
    }
}

// set initial scores
let playerScore = 0;
let compScore = 0;

// detect when the user submits name
let changeName = document.getElementById("nameForm");
changeName.addEventListener("submit", getUserName);

// play rock paper scissors when the user submits an option
let getThrow = document.getElementById("throwForm");
getThrow.addEventListener("submit", compete);

// reset the game
let getReset = document.getElementById("reset");
getReset.addEventListener("click", resetGame);