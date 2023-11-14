/*Course: SENG 513*/
/* Date: OCT 23, 2023 */
/* Assignment 2 */
/* Name: Hasan Nassar */
/* UCID: 30099862 */

//Skeleton for Connect4 Game

//Constant that never change throughout the game
const ROWS = 6
const COLUMNS = 7
const PLAYER_1 = 'red';
const PLAYER_2 = 'yellow';

let currentPlayer = PLAYER_1;
let gameBoard;
let player1Score = 0;
let player2Score = 0;
let drawScore = 0;
let gameStarted = false;

// Get the status elements
const player1TurnStatus = document.querySelector('.player1-turn');
const player2TurnStatus = document.querySelector('.player2-turn');
const player1WinStatus = document.querySelector('.player1-win');
const player2WinStatus = document.querySelector('.player2-win');
const drawStatus = document.querySelector('.status-draw');
const boardElement = document.querySelector('.board');

player1TurnStatus.style.display = 'none';
player2TurnStatus.style.display = 'none';
player1WinStatus.style.display = 'none';
player2WinStatus.style.display = 'none';
drawStatus.style.display = 'none';

// Initialize the game board when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeGame();
});

// Creates the game board to play the game
function initializeBoard(rows, columns) {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = ''; // Clear the board before reinitializing

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell empty';
            cell.id = `cell-${i}-${j}`;
            cell.onclick = () => cellClickListener(j); // Pass the column index to the click listener
            boardElement.appendChild(cell);
        }
    }
}

// Checks to see if player moves are valid and handles player moves accordingly
function playerMoves(column) {
    if (!gameStarted) {
        return; // Do nothing if the game has not started
    }

    if (checkGameWon()){
        return;
    }

    if(checkDraw()){
        return;
    }

    for (let i = ROWS - 1; i >= 0; i--) {
        if (gameBoard[i][column] === null) {
            gameBoard[i][column] = currentPlayer;

            // Check for a win or draw
            if (checkWinCondition(i, column)) {
                updateScoresBasedOnOutcome('win');
                updateBoard(i, column);
            } else if (draw()) {
                updateScoresBasedOnOutcome('draw');
                updateBoard(i, column);
            } else {
                // Switch to the other player's turn
                currentPlayer = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
                updateStatus();
            }

            updateBoard(i, column);
            break;
        }
    }
}

//Checks to see if someone won the game by getting fow in a row, column or diagonally
function checkWinCondition(row, column){
 // Check horizontally
 for (let i = 0; i <= COLUMNS - 4; i++) {
    if (
      gameBoard[row][i] === currentPlayer &&
      gameBoard[row][i + 1] === currentPlayer &&
      gameBoard[row][i + 2] === currentPlayer &&
      gameBoard[row][i + 3] === currentPlayer
    ) {
      return true;
    }
  }

  // Check vertically
  for (let i = 0; i <= ROWS - 4; i++) {
    if (
      gameBoard[i][column] === currentPlayer &&
      gameBoard[i + 1][column] === currentPlayer &&
      gameBoard[i + 2][column] === currentPlayer &&
      gameBoard[i + 3][column] === currentPlayer
    ) {
      return true;
    }
  }

  // Check diagonally (positive slope)
  for (let i = 0; i <= ROWS - 4; i++) {
    for (let j = 0; j <= COLUMNS - 4; j++) {
      if (
        gameBoard[i][j] === currentPlayer &&
        gameBoard[i + 1][j + 1] === currentPlayer &&
        gameBoard[i + 2][j + 2] === currentPlayer &&
        gameBoard[i + 3][j + 3] === currentPlayer
      ) {
        return true;
      }
    }
  }

  // Check diagonally (negative slope)
  for (let i = 0; i <= ROWS - 4; i++) {
    for (let j = COLUMNS - 1; j >= 3; j--) {
      if (
        gameBoard[i][j] === currentPlayer &&
        gameBoard[i + 1][j - 1] === currentPlayer &&
        gameBoard[i + 2][j - 2] === currentPlayer &&
        gameBoard[i + 3][j - 3] === currentPlayer
      ) {
        return true;
      }
    }
  }

  return false;
}

//Checks to see if the game ended in a stalemate instead of someone winning
function draw(){
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
          if (gameBoard[i][j] === null) {
            return false;
          }
        }
      }
      return true;
}

//Update the status above the game board to accurately portray whose turn it is and if someone won the game
function updateStatus(){
    player1TurnStatus.style.display = currentPlayer === PLAYER_1 ? 'block' : 'none';
    player2TurnStatus.style.display = currentPlayer === PLAYER_2 ? 'block' : 'none';

    player1TurnStatus.style.color = currentPlayer === PLAYER_1 ? '#FF4136' : '';
    player2TurnStatus.style.color = currentPlayer === PLAYER_2 ? '#FFD700' : '';

    player1WinStatus.style.display = 'none';
    player2WinStatus.style.display = 'none';
    drawStatus.style.display = 'none';
}

//update the gameboard when someone makes a move
function updateBoard(row, column){
    const cell = document.getElementById(`cell-${row}-${column}`);
    cell.classList.remove('empty');
    cell.style.backgroundColor = gameBoard[row][column] === PLAYER_1 ? '#FF4136' : '#FFD700';
  }

function updateScores() {
    document.getElementById('player1-score').innerText = `Score: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Score: ${player2Score}`;
    document.getElementById('draw-score').innerText = `Score: ${drawScore}`;
}

// Update scores based on the game outcome
function updateScoresBasedOnOutcome(outcome) {
    if (outcome === 'win') {
        if (currentPlayer === PLAYER_1) {
            player1Score++;
            player1TurnStatus.style.display = 'none';
            player1WinStatus.style.display = 'block';
            player1WinStatus.style.color = '#FF4136';
            gameStarted = false;
        } else {
            player2Score++;
            player2TurnStatus.style.display = 'none';
            player2WinStatus.style.display = 'block';
            player2WinStatus.style.color = '#FFD700';
            gameStarted = false;
        }
    } else if (outcome === 'draw') {
        drawScore++;
        player1TurnStatus.style.display = 'none';
        player2TurnStatus.style.display = 'none';
        drawStatus.style.display = 'block';
        drawStatus.style.color = '#FF7518';
        gameStarted = false;
    }
    updateScores();
}

// Check if the game has been won
function checkGameWon() {
    return player1WinStatus.style.display === 'block' || player2WinStatus.style.display === 'block';
}

function checkDraw(){
    return drawStatus.style.display === 'block';
}

//add functionality to the start game button to properly start the game 
function startGameListener(){
    gameStarted = true;
    initializeGame();
}

//add functionality to the reset game button in order to reset the game properly
function resetGameListener(){
    initializeGame();
}

//add functionality that listens to which cell the user is currently clicking
function cellClickListener(column){
    playerMoves(column)
}

// Function to reset the visual representation of the game board
function resetBoardUI() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
    cell.className = 'cell empty';
    cell.style.backgroundColor = '';
  });
  }


//Initialize the Game 
function initializeGame(){
    currentPlayer = PLAYER_1;
    gameBoard = createBoard(ROWS, COLUMNS);
    if(gameStarted){
        initializeBoard(ROWS, COLUMNS);
        updateStatus();
        resetBoardUI();
    }
}

// Creates the game board to play the game
function createBoard(rows, columns) {
    return new Array(rows).fill(null).map(() => new Array(columns).fill(null));
  }
