const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.board-cell');

  const getCells = () => cells;
  const isValidMove = (move) => board[move] === '';

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

        if (gameBoard.isValidMove(index)) {
          gameBoard.updateBoard(index, currentPlayer.getToken());
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
