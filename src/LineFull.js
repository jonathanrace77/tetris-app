function lineFull(
  board,
  score
) {
  let count;
  let comboCount = 0;

  for (let k = 19; k > 0; k--) {
    count = 0;
    for (let j = 0; j <= 9; j++) {
      if (board[k][j] === 1) {
        count++;
      }
    }
    if (count === 10) {
      
      // Move everything down one
      for (let m = k; m > 0; m--) {
        for (let n = 0; n <= 9; n++) {
          board[m][n] = board[m - 1][n];
        }
      }
      comboCount++;
      k = 19;
    }
  }

  //console.log('Checkpoint 5 - Success', score + comboCount * 100);

  return [board, score + comboCount * 100];
}

export default lineFull;
