const puzzleContainer = document.getElementById('puzzle-container');

const gridSize = 3;
const totalPieces = gridSize * gridSize;

function createPuzzle() {
    const numbers = Array.from({ length: totalPieces - 1 }, (_, index) => index + 1);
    numbers.push(null); // Add null for the empty space

    numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers

    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.innerText = numbers[i] !== null ? numbers[i] : '';
        piece.setAttribute('data-index', i);

        piece.addEventListener('click', () => movePiece(piece));

        puzzleContainer.appendChild(piece);
    }
}

function movePiece(piece) {
    const currentIndex = parseInt(piece.dataset.index);
    const emptyIndex = Array.from(puzzleContainer.children).findIndex(child => child.innerText === '');

    if (isAdjacent(currentIndex, emptyIndex)) {
        swapPieces(piece, puzzleContainer.children[emptyIndex]);
        checkWin();
    }
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;

    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    return (
        Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1
    );
}

function swapPieces(piece1, piece2) {
    const tempText = piece1.innerText;
    piece1.innerText = piece2.innerText;
    piece2.innerText = tempText;

    const tempIndex = piece1.dataset.index;
    piece1.dataset.index = piece2.dataset.index;
    piece2.dataset.index = tempIndex;
}

function checkWin() {
    const pieces = Array.from(puzzleContainer.children);
    const currentOrder = pieces.map(piece => parseInt(piece.innerText));

    if (currentOrder.every((number, index) => number === index + 1) && currentOrder[currentOrder.length - 1] === null) {
        alert('Congratulations! You solved the puzzle!');
    }
}

createPuzzle();
