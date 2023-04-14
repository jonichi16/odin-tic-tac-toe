const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.board-cell');

  const getCells = () => cells;

  const displayCurrentBoard = () => {
    cells.forEach((cell, index) => {
      const updatedCell = cell;
      updatedCell.textContent = board[index];
    });
  };

  const updateBoard = (index, token) => {
    if (board[index] === '') {
      board[index] = token;
    }
    displayCurrentBoard();
  };

  return {
    getCells,
    displayCurrentBoard,
    updateBoard,
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
    currentPlayer.displayPlayer();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const init = () => {
    gameBoard.getCells().forEach((cell, index) => {
      cell.addEventListener('click', (e) => {
        e.preventDefault();

        gameBoard.updateBoard(index, currentPlayer.getToken());
        switchPlayer();
        displayPlayerTurn();
      });
    });
    gameBoard.displayCurrentBoard();
  };

  const play = () => {
    init();
    displayPlayerTurn();
  };

  return {
    play,
  };
})();

gameController.play();
