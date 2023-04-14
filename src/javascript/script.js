const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
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

  return {
    getCells,
    displayCurrentBoard,
    updateBoard,
    isValidMove,
    isBoardFull,
    isBoardWin,
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
    } else if (gameBoard.isBoardFull()) {
      gameOver = true;
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

  const play = () => {
    init();
  };

  return {
    play,
  };
})();

gameController.play();
