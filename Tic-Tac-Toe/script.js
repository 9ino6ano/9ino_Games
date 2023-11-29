let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');

function handleClick(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else if (isBoardFull()) {
            alert('It\'s a tie!');
            resetGame();
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

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
