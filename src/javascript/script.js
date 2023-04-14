const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.board-cell');

  const displayCurrentBoard = () => {
    cells.forEach((cell, index) => {
      const updatedCell = cell;
      updatedCell.textContent = board[index];
    });
  };

  const updateBoard = (move, token) => {
    board[move] = token;
  };

  return {
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

  const play = () => {
    gameBoard.displayCurrentBoard();
  };

  return {
    play,
  };
})();

gameController.play();
