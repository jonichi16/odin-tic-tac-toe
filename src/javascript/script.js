const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const cells = document.querySelectorAll('.board-cell');

  const getCells = () => cells;
  const isValidMove = (move) => board[move] === '';
  const isBoardFull = () => !board.includes('');

  const isBoardWin = (token) => {
    let win = false;
    for (let i = 0; i < winConditions.length; i += 1) {
      if (
        board[winConditions[i][0]] === token &&
        board[winConditions[i][1]] === token &&
        board[winConditions[i][2]] === token
      ) {
        win = true;
        break;
      }
    }
    return win;
  };

  const displayCurrentBoard = () => {
    cells.forEach((cell, index) => {
      const updatedCell = cell;
      updatedCell.textContent = board[index];
    });
  };

  const updateBoard = (index, token) => {
    board[index] = token;
    displayCurrentBoard();
  };

  const boardReset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return {
    getCells,
    displayCurrentBoard,
    updateBoard,
    isValidMove,
    isBoardFull,
    isBoardWin,
    boardReset,
  };
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  const displayPlayer = () => {
    const currentPlayerContainer = document.querySelector('.current-player');

    currentPlayerContainer.textContent = ` ${name}'s Turn `;
  };

  return {
    getName,
    getToken,
    displayPlayer,
  };
};

const modal = (() => {
  const modalContainer = document.querySelector('.modal');
  const message = document.querySelector('.message');
  const resetBtn = document.querySelector('.reset-btn');

  const hideModal = () => {
    modalContainer.classList.add('hidden');
  };

  const showModal = (result, player = null) => {
    if (result === 'win') {
      message.innerHTML = `Congratulations! <span class="winner">${player.getName()} win!</span>`;
    } else {
      message.textContent = "It's a TIE!";
    }

    modalContainer.classList.remove('hidden');
  };

  const getResetBtn = () => resetBtn;

  return {
    showModal,
    hideModal,
    getResetBtn,
  };
})();

const gameController = (() => {
  let gameOver = false;
  const playerOne = Player('Player 1', 'O');
  const playerTwo = Player('Player 2', 'X');
  let currentPlayer = playerOne;

  const displayPlayerTurn = () => {
    if (!gameOver) {
      currentPlayer.displayPlayer();
    }
  };

  const switchPlayer = () => {
    if (!gameOver) {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
  };

  const gameCheck = (player) => {
    if (gameBoard.isBoardWin(player.getToken())) {
      gameOver = true;
      modal.showModal('win', player);
    } else if (gameBoard.isBoardFull()) {
      gameOver = true;
      modal.showModal('tie');
    }
  };

  const init = () => {
    gameBoard.getCells().forEach((cell, index) => {
      cell.addEventListener('click', (e) => {
        e.preventDefault();

        if (gameBoard.isValidMove(index) && !gameOver) {
          gameBoard.updateBoard(index, currentPlayer.getToken());
          gameCheck(currentPlayer);
          switchPlayer();
          displayPlayerTurn();
        }
      });
    });
    gameBoard.displayCurrentBoard();
    displayPlayerTurn();
  };

  const resetGame = () => {
    modal.getResetBtn().addEventListener('click', (e) => {
      e.preventDefault();

      gameBoard.boardReset();
      gameOver = false;
      currentPlayer = playerOne;
      modal.hideModal();
      init();
    });
  };

  const play = () => {
    init();
    resetGame();
  };

  return {
    play,
  };
})();

gameController.play();
