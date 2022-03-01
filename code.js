const myGameBoard = (function () {
    // const board = ['', '', '', '', '', '', '', '', ''];
    const board = ['X', 'O', 'O', 'X', 'O', 'X', 'O', 'X', 'X'];
    const _logBoard = console.log(board);

    return{
        board
    };
})
();



const boardCell = document.querySelectorAll('.board-cell');

boardCell.forEach((cell) => cell.addEventListener('click', function () {
    
    this.textContent = myGameBoard.board[parseInt(this.id)];

}))

