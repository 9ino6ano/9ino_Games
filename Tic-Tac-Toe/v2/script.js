let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
const messageContainer = document.querySelector('.message-container');
const messageText = document.querySelector('.message-text');

function handleClick(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            showResult(`Player ${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            showResult('It\'s a tie!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination =>
        combination.every(index => cells[index].textContent === currentPlayer)
    );
}

function isBoardFull() {
    return [...cells].every(cell => cell.textContent);
}

function showResult(message) {
    messageText.textContent = message;
    messageContainer.style.display = 'block';
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    messageContainer.style.display = 'none';
}

document.querySelector('#newGameBtn').addEventListener('click', resetGame);
