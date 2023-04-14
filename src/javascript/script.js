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

  const updateBoard = (move, token) => {
    board[move] = token;
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

  return {
    getName,
    getToken,
  };
};

const gameController = (() => {
  let gameOver = false;
  const playerOne = Player('Player 1', 'O');
  const playerTwo = Player('Player 2', 'X');
  const currentPlayer = playerOne;

  const init = () => {
    gameBoard.getCells().forEach((cell, index) => {
      cell.addEventListener('click', (e) => {
        e.preventDefault();

        gameBoard.updateBoard(index, currentPlayer.getToken());
      });
    });
    gameBoard.displayCurrentBoard();
  };

  const play = () => {
    init();
  };

  return {
    play,
  };
})();

gameController.play();
