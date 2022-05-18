class Game {

    constructor(mt = 3) {

        this.control = true;
        this.youScore = 0;
        this.comScore = 0;
        this.turns  = 0;
        this.draw = 0;
        this.maxTurns = mt;
        this.playerMove = '';
        this.compMove = '';
        this.turnWinner = '';
        this.gameWinner = '';
        this.logBlock = document.getElementById('log');
        this.logBlock.innerHTML = '';
        this.winnerBlock = document.getElementById('winner');
        this.winnerBlock.innerHTML = '';
        this.rock = '<img src="assets/rock-1.png" alt="">';
        this.scissor = '<img src="assets/scissor-1.png" alt="">';
        this.paper = '<img src="assets/paper-1.png" alt="">';
        this.playerMoveBlock = document.getElementById('playerMove');
        this.computerMoveBlock = document.getElementById('computerMove');
        this.playerMoveBlock.innerHTML = '';
        this.computerMoveBlock.innerHTML = '';
        this.mainUserScore = document.getElementById('user-score');
        this.mainComputerScore = document.getElementById('com-score');
        this.mainUserScore.innerHTML = '0';
        this.mainComputerScore.innerHTML = '0';
        this.playerButtons = document.getElementById('player-turn-button');
        this.playerButtons.style.display = 'flex';
        this.inputBlock = document.getElementById('max-turns-input');
        this.inputBlock.disabled = true;
        this.inputBlock.value = this.maxTurns;
        this.compStar = document.getElementById('compStar');
        this.youStar = document.getElementById('youStar');
        this.compStar.style.display = 'none';
        this.youStar.style.display = 'none';
    }

    getImage(move) {
        let result = '';
        switch(move) {
            case 'ROCK': result = this.rock;
                         break;
            case 'PAPER': result = this.paper;
                        break;
            case 'SCISSOR': result = this.scissor;
                         break;
        }
        return result;
    }

    renderPlayerMove() {
        this.playerMoveBlock.innerHTML = this.getImage(this.playerMove);
    }
    renderComputerMove() {
        this.computerMoveBlock.innerHTML = this.getImage(this.compMove);
    }

    convert(i) {
        let result = '';
        switch(i) {
            case 0: result = 'ROCK';
                    break;
            case 1: result = 'PAPER';
                    break;
            case 2: result = 'SCISSOR';
                    break;
        }
        return result;
    }

    setPlayerMove(move) {
        this.playerButtons.style.display = 'none';
        this.control = false;
        this.playerMove = move;
        this.setComputerMove();
    }

    setComputerMove() {
        let i = parseInt((Math.random()*10)%3);
        this.compMove = this.convert(i);
        this.computerMoveBlock.innerHTML = '<i class="fas fa-sync fa-spin" style="font-size: 35px; color: white;"></i>';
        this.playerMoveBlock.innerHTML = '<i class="fas fa-sync fa-spin" style="font-size: 35px; color: white;"></i>';
        setTimeout(() => {
            this.renderPlayerMove();
            this.renderComputerMove();
            this.fight();
        }, 1000);
    }

    addTolog() {
        let div = document.createElement('div');
        let no = document.createElement('div');
        let p = document.createElement('div');
        let c = document.createElement('div');
        let s = document.createElement('div');
        no.innerHTML = this.turns;
        p.innerHTML = this.playerMove;
        c.innerHTML = this.compMove;
        let color = 'gray';
        if(this.turnWinner != 'Draw')
            color = this.turnWinner == 'Player' ? 'Green' : 'red';
        s.innerHTML = `<span style='color:${color}'>${this.turnWinner}</span>`;
        div.appendChild(no);
        div.appendChild(p);
        div.appendChild(c);
        div.appendChild(s);
        this.logBlock.appendChild(div);

        if(this.turnWinner == 'Player') {
            this.youStar.style.display = 'block';
        }
        else {
            this.compStar.style.display = 'block';
        }
        setTimeout(() => {
            this.youStar.style.display = 'none';
            this.compStar.style.display = 'none';
        }, 1000);
    }

    fight() {
        if(this.turns >= this.maxTurns)
            return;

        let symbol = this.playerMove + '-' + this.compMove;
        let turnWinner = '';
        this.turns++;
        switch(symbol) {
            case 'ROCK-PAPER':  turnWinner = 'Computer';
                                this.comScore++;
                                break;
            case 'PAPER-SCISSOR':  turnWinner = 'Computer';
                                this.comScore++;
                                break;
            case 'SCISSOR-ROCK':  turnWinner = 'Computer';
                                this.comScore++;
                                break;
            case 'ROCK-SCISSOR':  turnWinner = 'Player';
                                this.youScore++;
                                break;
            case 'PAPER-ROCK':  turnWinner = 'Player';
                                this.youScore++;
                                break;
            case 'SCISSOR-PAPER':  turnWinner = 'Player';
                                this.youScore++;
                                break;
            case 'ROCK-ROCK':  turnWinner = 'Draw';
                               this.draw++;
                               break;
            case 'PAPER-PAPER':  turnWinner = 'Draw';
                                 this.draw++;
                                 break;
            case 'SCISSOR-SCISSOR':  turnWinner = 'Draw';
                                     this.draw++;
                                     break;
        }
        this.turnWinner = turnWinner;
        this.addTolog();
        this.checkWinner();
    }

    checkWinner() {
        this.mainUserScore.innerHTML = this.youScore;
        this.mainComputerScore.innerHTML = this.comScore;
        console.log(this.maxTurns);
        let color = '';


        if(this.youScore == this.comScore && this.maxTurns == this.turns) { // draw state
            color = 'gray';
            this.gameWinner = 'Game Draw';
        }
        else {
            // check if loosing player can still win or not
            let loosingScore = this.youScore > this.comScore ? this.comScore : this.youScore;
            let winningScore = this.youScore > this.comScore ? this.youScore : this.comScore; 
            // calculate number of turns left
            let leftTurns = this.maxTurns - this.turns;
            if(loosingScore + leftTurns < winningScore) { 
                // loosing player can't win from this step
                if(this.comScore > this.youScore) {
                    color = 'red';
                    this.gameWinner = 'Computer Wins';
                }
                else {
                    color = 'green';
                    this.gameWinner = 'Player Wins';
                }
            }
        }

        this.control = true;
        this.playerButtons.style.display = 'flex';
        if(this.gameWinner) {
            this.control = false;
            this.inputBlock.disabled = false;
            document.getElementById('play').style.display = 'block';
            document.getElementById('game-started').style.display = 'none';
            this.playerButtons.style.display = 'none';
            this.winnerBlock.innerHTML = `<span style='color:${color}'>${this.gameWinner}</span>`;
        }
    }

    kill() {
        document.getElementById('play').style.display = 'block';
        document.getElementById('game-started').style.display = 'none';
        this.control = false;
        this.winnerBlock.innerHTML = '';
        this.mainComputerScore.innerHTML = '0';
        this.mainUserScore.innerHTML = '0';
        this.logBlock.innerHTML = '';
        this.playerMoveBlock.innerHTML = '';
        this.computerMoveBlock.innerHTML = '';
        this.playerButtons.style.display = 'none';
        this.inputBlock.disabled = false;
    }

}
var game = null;
const playButton = document.getElementById('play');
const gameStarted = document.getElementById('game-started');
playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    gameStarted.style.display = 'block';
    let mt = document.getElementById('max-turns-input');
    let value = mt.value >= 1 ? mt.value : 3;
    if(value)
        game = new Game(value);
});

document.getElementById('user-rock').addEventListener('click', () => {
    if(game != null && game.control) {
        game.setPlayerMove('ROCK');
    }
})
document.getElementById('user-paper').addEventListener('click', () => {
    if(game != null && game.control) {
        game.setPlayerMove('PAPER');
    }
})
document.getElementById('user-scissor').addEventListener('click', () => {
    if(game != null && game.control) {
        game.setPlayerMove('SCISSOR');
    }
})

document.getElementById('reset').addEventListener('click', () => {
    if(game) {
        game.kill();
    }
})
