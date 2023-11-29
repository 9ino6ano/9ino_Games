const choices = ['rock', 'paper', 'scissors'];

function computerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(user, computer) {
    if (user === computer) return 'It\'s a tie!';
    if ((user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
}

function userChoice(user) {
    const comp = computerChoice();
    const result = determineWinner(user, comp);
    const resultText = `You chose ${user}. The computer chose ${comp}. ${result}`;
    document.getElementById('result-text').innerText = resultText;
}
