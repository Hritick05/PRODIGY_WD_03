const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations (indexes of the board)
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

// Initialize board
function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push("");
  }

  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

createBoard();
