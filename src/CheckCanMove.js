function CheckCanMove(board) {
  // Find where the active block is
  for (let j = 0; j <= 9; j++) {
    for (let k = 19; k > 0; k--) {
      if (board[k][j] === 2) {
        // If the bottom of the block is at the bottom then return false || If a collision is detected then return false
        if (k === 19 || board[k + 1][j] === 1) {
          return 0;
        }
        break;
      }
    }
  }

  return 1;
}

export default CheckCanMove;
