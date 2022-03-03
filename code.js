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
             _board[i] = ''; 
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
    const _restartBtn = document.querySelectorAll('button');

    _boardCell.forEach(cell => {
        cell.addEventListener('click', _clickHandler);        
    });

    _restartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const _messages = document.getElementById('message');
            myGame.reset();
            gameBoard.reset();
            _boardCell.forEach(cell => {cell.textContent = ''});
            _messages.textContent = "    ";
            _closeModal();
        } )
    })

    function _clickHandler(e) {
        if (myGame.isOver()||this.textContent !=='') return;

        myGame.gameRound(parseInt(e.target.dataset.index));
        this.textContent = gameBoard.boardIndex(this.id);
    }

    const _closeModal = () => {
        const modal = document.getElementById('modal');
        const overlay = document.getElementById('overlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
})
();

//MODULE PATTERN 03 =

const myGame = (() => {

    const _Player = (mark) => {
        this.mark = mark;

        const _playerMark = () => {
            return mark;
        };
        
        return {_playerMark};

    };

    const _playerOne = _Player('X');
    const _playerTwo = _Player ('O');
    let _roundCounter = 1;
    let gameOver = false;

    const _messages = document.getElementById('message');

    const gameRound = (boardIndex) => {

        gameBoard.setIndexContent(boardIndex, _currentPlayer());
        if (_whoWins(boardIndex) === true) {
            _messages.textContent = `Congratulatiosn player ${_currentPlayer()}, you Won!`;
            _openModal();
            gameOver = true;
            return;
        }
        if (_roundCounter === 9) {
            _messages.textContent = 'It´s a Draw';
            _openModal();
            gameOver = true;
        }
        _roundCounter++;
    }

    const _currentPlayer = () => {
        if (_roundCounter % 2 === 1) return _playerOne._playerMark()
        else return _playerTwo._playerMark();
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

    const reset = () => {
         _roundCounter = 1;
         gameOver = false;
    }

    const isOver = () => {
        return gameOver;
    };
    
    const _openModal = () => {
        const modal = document.getElementById('modal');
        const overlay = document.getElementById('overlay');

        modal.classList.add('active');
        overlay.classList.add('active');
    }

    

    return{
        gameRound, reset, isOver
    };
    
})
();





