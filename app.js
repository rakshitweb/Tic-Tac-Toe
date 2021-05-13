const cellElements = document.querySelectorAll('.cell');
const gameBoard = document.querySelector('.board');
const resultDivMessage = document.querySelector('.result .message');
const resultDiv = document.querySelector('.result');
const restartBtn = document.querySelector('.game-option');
const playerType = document.querySelectorAll('.player-option button');
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let xTurn;
let isComputer;

const printMove = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const switchTurn = () => {
    xTurn = !xTurn;
}

const setBoardHoverClass = () => {
    gameBoard.classList.remove('x');
    gameBoard.classList.remove('o');
    if(xTurn) {
        gameBoard.classList.add('x');
    } else {
        gameBoard.classList.add('o');
    }
}

const checkWin = (currClass) => {
    return winningPositions.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currClass);
        });
    });
};

const endGame = (draw) => {
    if(draw) {
        resultDivMessage.innerText = `DRAW!!`;
    } else {
        resultDivMessage.innerText = `${xTurn ? "X" : "O"} Wins!`;
    }
    resultDiv.classList.add('show');
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const generateSpace = () => {
    let pos = Math.floor(Math.random() * 9);
    if(cellElements[pos].classList.contains('x') || cellElements[pos].classList.contains('o')) {
        return generateSpace();
    } else {
        return pos;
    }
}

const computerTurn = () => {
    let position = generateSpace();
    cellElements[position].classList.add(`${xTurn ? "x" : "o"}`);
    cellElements[position].style.pointerEvents = "none";
    if(checkWin(`${xTurn ? "x" : "o"}`)){
        endGame(false);
    }
    switchTurn();
}

const gameProceed = (e) => {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    printMove(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        switchTurn();
        if(isComputer) {
            computerTurn();
        }
        setBoardHoverClass();
    }
}

const startGame = () => {
    xTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.style.pointerEvents = "";
        cell.removeEventListener('click', gameProceed);
        cell.addEventListener('click', gameProceed, {once: true});
    });
    setBoardHoverClass();
    resultDiv.classList.remove('show');
}

restartBtn.addEventListener('click', startGame);
playerType[0].addEventListener('click', ()=>{
    isComputer = false;
    if(!playerType[0].classList.contains('selected')) {
        playerType[0].classList.add('selected');
    };
    playerType[1].classList.remove('selected');
    startGame();
});
playerType[1].addEventListener('click', () => {
    isComputer = true;
    if(!playerType[1].classList.contains('selected')) {
        playerType[1].classList.add('selected');
    };
    playerType[0].classList.remove('selected');
    startGame();
})

startGame();