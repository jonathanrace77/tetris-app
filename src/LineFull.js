function lineFull(
  board
) {
  let count;

  for (let k = 19; k > 0; k--) {
    count = 0;
    for (let j = 0; j <= 9; j++) {
      if (board[k][j] === 1) {
        count++;
      }
    }
    // If line is full
    if (count === 10) {
      // Move everything down one
      for (let m = k; m > 0; m--) {
        for (let n = 0; n <= 9; n++) {
          board[m][n] = board[m - 1][n];
        }
      }
      k = 19;
      
    }  
  }

  return board;
}

export default lineFull;
