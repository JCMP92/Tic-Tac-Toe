"use strict";

//MODULE PATTERN 01 = This module manages the changes inside the _board array and return the info about it.

const gameBoard = (() => {
    const _board = ['', '', '', '', '', '', '', '', ''];
    // const _board = ['X', 'O', 'O', 'X', 'O', 'X', 'O', 'X', 'X'];

    const  boardIndex = (index) => {
        if (index > _board.length) return;
        return _board[index];
    }
    const setIndexContent = (index, content) => {
        if (index > _board.length) return;
        return _board[index] = content;
    }
    const reset = () => {
        for (let i= 0; i< _board.length; i++) {
            return _board[i] = ''; 
        }
    }

    return{
        boardIndex, setIndexContent, reset
    };
})
();

//MODULE PATTERN 02 = 

const displayController = (() => {
    const _boardCell = document.querySelectorAll('.board-cell');

    _boardCell.forEach(cell => {
        cell.addEventListener('click', (e) => {

            myGame.gameRound(parseInt(e.target.dataset.index));
            _updateBoard();
            cell.textContent = gameBoard.boardIndex(cell.id);

        }, {once:true});        
    });

    const _updateBoard = () => {
        for(let i = 0; i<_boardCell; i++){
            _boardCell[i].textContent = gameBoard.boardIndex(i);
        }
    };

})
();

//MODULE PATTERN 03 =

const myGame = (() => {

    const Player = (mark) => {
        this.mark = mark;

        const playerMark = () => {
            return mark;
        };
        
        return {playerMark};

    };

    const playerOne = Player('X');
    const playerTwo = Player ('O');
    let roundCounter = 1;

    const gameRound = (boardIndex) => {

        gameBoard.setIndexContent(boardIndex, currentPlayer());
        roundCounter++;
    }

    const currentPlayer = () => {
        if (roundCounter % 2 === 1) return playerOne.playerMark()
        else return playerTwo.playerMark();
    }
    
    return{
        gameRound
    };
    
})
();





