const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {
    getName,
    getToken,
  };
};

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.board-cell');

  const updateBoard = (move, token) => {
    board[move] = token;

    cells.forEach((cell, index) => {
      const updatedCell = cell;
      updatedCell.textContent = board[index];
    });
  };

  const init = () => {
    cells.forEach((cell, index) => {
      const updatedCell = cell;
      updatedCell.textContent = board[index];

      updatedCell.addEventListener('click', (e) => {
        e.preventDefault();

        updateBoard(index, 'O');
      });
    });
  };

  init();
})();
