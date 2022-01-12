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

    //add checker for gameOver
    return {init, board}; 
})();

const displayController = (() =>{
    const init = () => {
        //clean up existing elements
        if (htmlGameBoard.children.length !== 0) {
            htmlGameBoard.children.forEach(e => e.remove());
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
        grids.forEach(el => el.addEventListener('click', e => {
            console.log(e.target);
            const turnDisplay = document.querySelector('#player-turn');
            
            let i = e.target.getAttribute('data-i-index');
            let j = e.target.getAttribute('data-j-index');
            if (gameBoard.board[i][j] === '') {
                gameBoard.board[i][j] = currentPlayer.item;
                e.target.classList.add(currentPlayer.item);
                console.table(gameBoard.board);
            }
            //change turn
            if (currentPlayer == playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
            turnDisplay.textContent = `${currentPlayer.name} Turn`;
        })
        )
    }
    return {init};
})()



const playerOne = player('Player 1', 'o');
const playerTwo = player('Player 2', 'x');
let currentPlayer = playerOne;

gameBoard.init();
displayController.init();