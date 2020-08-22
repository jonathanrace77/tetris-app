function checkGameOver(board, cBlockType) {
  let blockHeight = 1;
  if (
    cBlockType === "zee" ||
    cBlockType === "ess" ||
    cBlockType === "tee" ||
    cBlockType === "square"
  )
    blockHeight = 2;
  if (cBlockType === "jay" || cBlockType === "ell") blockHeight = 3;

  if (board[blockHeight][3] === 1 || board[blockHeight][4] === 1) return 1;

  return 0;
}

export default checkGameOver;
