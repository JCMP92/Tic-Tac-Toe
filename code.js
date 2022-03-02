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
            cell.textContent = gameBoard.boardIndex(cell.id);

        }, {once:true});        
    });
})
();

//MODULE PATTERN 03 =

const myGame = (() => {

    const _Player = (mark) => {
        this.mark = mark;

        const playerMark = () => {
            return mark;
        };
        
        return {playerMark};

    };

    const playerOne = _Player('X');
    const playerTwo = _Player ('O');
    let roundCounter = 1;

    const gameRound = (boardIndex) => {

        gameBoard.setIndexContent(boardIndex, _currentPlayer());
        if (_whoWins(boardIndex) === true) {
            window.alert('You win!');
        }
        roundCounter++;
    }

    const _currentPlayer = () => {
        if (roundCounter % 2 === 1) return playerOne.playerMark()
        else return playerTwo.playerMark();
    }

    const _whoWins = (boardIndex) => {
        const _winnerComb = [
            //Horizontal combinations
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            //Vertical combinations
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            //Diagonal combinations
            [0, 4, 8],
            [2, 4, 6]
        ];

        return _winnerComb
        .filter((line) => line.includes(boardIndex))
        .some((winnerLine) => winnerLine.every (
            (index) => gameBoard.boardIndex(index) === _currentPlayer()
            )
        )
    }
    
    return{
        gameRound
    };
    
})
();





