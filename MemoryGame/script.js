document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = symbols.concat(symbols); // Duplicate symbols to create pairs
    let flippedCards = [];
    let moves = 0;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = symbol;
        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    function createBoard() {
        const shuffledCards = shuffle(cards);
        const gameContainer = document.getElementById('game-container');

        shuffledCards.forEach(symbol => {
            const card = createCard(symbol);
            gameContainer.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !flippedCards.includes(card)) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            card1.removeEventListener('click', () => flipCard(card1));
            card2.removeEventListener('click', () => flipCard(card2));
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
        moves++;

        if (allPairsMatched()) {
            alert(`Congratulations! You won in ${moves} moves.`);
            resetGame();
        }
    }

    function allPairsMatched() {
        const allCards = document.querySelectorAll('.card');
        return [...allCards].every(card => !card.classList.contains('flipped'));
    }

    function resetGame() {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = '';
        moves = 0;
        flippedCards = [];
        createBoard();
    }

    createBoard();
});
