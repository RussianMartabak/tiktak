const htmlGameBoard = document.querySelector('.gameboard');


const player = (name, item) => {
    
    return {name, item};
};

const gameBoard = (() => {
    let board = [];
    //fill the board
    const init = () => {
        //clear previous leftover
        if (board.length !== 0) {
            board.splice(0, 3);
        }

        for(let i = 0; i < 3; i++) {
            let row = []
            for(let j = 0; j < 3; j++) {
                row.push('');
            }
            board.push(row);
        }
        console.log(board);
    }
    const gameWon = player => {
        if (horizontalCheck(player)) {
            return true;
        } else if (verticalCheck(player)) {
            return true;
        } else {
            return false;
        }

    }
    const isFull = () => {
        let blanks = 0;
        for(let i = 0; i < 3; i++) {
            
            for(let j = 0; j < 3; j++) {
                if (board[i][j] === '') blanks++;
            }
            
        }
        return (blanks === 0) ? true : false;
    }
    const horizontalCheck = player => {
        //count the number of player's item in horizontal lanes
        let consectutives = 0;
        for(let i = 0; i < 3; i++) {
            consectutives = 0;
            for(let j = 0; j < 3; j++) {
                if (board[i][j] === player.item) consectutives++;
            }
            if (consectutives === 3) return true;
            
        }
        return false;
    }

    const verticalCheck = player => {
        for(let column = 0; column < 3; column++) {
            let consectutives = 0;
            for(let row = 0; row < 3; row++) {
                if (board[row][column] === player.item) consectutives++;
            }
            if (consectutives === 3) return true;
        }
        return false;
    }

    //add checker for gameOver
    return {init, board, gameWon, isFull}; 
})();

const displayController = (() =>{
    const removeEventListeners = () => {
        let grids = document.querySelectorAll('.gameboard-grid');
        grids.forEach( e => e.removeEventListener('click', handler))
    }
    function handler(e) {
        
        console.log(e.target);
        
        
        let i = e.target.getAttribute('data-i-index');
        let j = e.target.getAttribute('data-j-index');
        if (gameBoard.board[i][j] === '') {
            gameBoard.board[i][j] = currentPlayer.item;
            e.target.classList.add(currentPlayer.item);
            console.table(gameBoard.board);
        }
        //check if currentplyaer win
        if (gameBoard.gameWon(currentPlayer)) {
            turnDisplay.textContent = `${currentPlayer.name} has won the game`;
            setTimeout(() => {alert(`${currentPlayer.name} has won the game`)}, 200);
            removeEventListeners();
            return;
        } else if (gameBoard.isFull()) {
            turnDisplay.textContent = `Stalemate! Nobody Wins`;
            setTimeout(() => {alert(`Stalemate! Nobody Wins`)}, 200);
            removeEventListeners();
            return;
        }
        //change turn
        toggleTurn();
            
        
    }
    const init = () => {
        //clean up existing elements
        if (htmlGameBoard.children.length !== 0) {
            let childrens = [...htmlGameBoard.children];
            childrens.forEach(e => e.remove());
            currentPlayer = playerOne;
            turnDisplay.textContent = `${currentPlayer.name} Turn`;
        }

        //add grid based on the board arrray 
        for(let i = 0; i < 3; i++) {
            
            for(let j = 0; j < 3; j++) {
                const grid = document.createElement('div');
                grid.classList.add('gameboard-grid');
                grid.setAttribute('data-i-index', i);
                grid.setAttribute('data-j-index', j);
                htmlGameBoard.appendChild(grid);
                
                
            }
        }
        //and add event listener for click
        let grids = document.querySelectorAll('.gameboard-grid');
        grids.forEach(el => el.addEventListener('click', handler)
        )
    }
    
    return {init};
})()


const turnDisplay = document.querySelector('#player-turn');
const playerOne = player('Player 1', 'o');
const playerTwo = player('Player 2', 'x');
const newGameButton = document.querySelector('#new-game');
let currentPlayer = playerOne;

gameBoard.init();
displayController.init();
newGameButton.addEventListener('click', () => {
    gameBoard.init();
    displayController.init();
})

function toggleTurn() {
    //change turn
    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }
    turnDisplay.textContent = `${currentPlayer.name} Turn`;
}