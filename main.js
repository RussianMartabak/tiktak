const htmlGameBoard = document.querySelector('.gameboard');


const player = (name, item) => {
    
    return {name, item};
};

const gameBoard = (() => {
    let board = [];
    //fill the board and add event listener to each of them
    const init = () => {
        for(let i = 0; i < 3; i++) {
            let row = []
            for(let j = 0; j < 3; j++) {
                row.push('');
            }
            board.push(row);
        }
        console.log(board);
    }
    return {init, board}; 
})();

const displayController = (() =>{
    const refreshBoard = (board) => {
        //clean up existing elements
        htmlGameBoard.children.forEach(e => e.remove());

        //add grid based on the board arrray and add event listener for click
    }
    return {refreshBoard};
})

/* for(let i = 0; i < 3; i++) {
            let row = []
            for(let j = 0; j < 3; j++) {
                const grid = document.createElement('div');
                grid.classList.add('gameboard-grid');
                grid.setAttribute('data-item', 'blank');
                htmlGameBoard.appendChild(grid);
                board.push(grid);
            }
            board.push(row);
        } */

const playerOne = player('player 1', 'o');
const playerTwo = player('player 2', 'x');
let currentPlayer = playerOne;

gameBoard.init();
console.log(gameBoard.board[0][1]);