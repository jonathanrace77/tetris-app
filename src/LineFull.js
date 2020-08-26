function lineFull(board, combo, linesToDelete) {
  let count;
  let comboCount = combo;
  //let linesToDelete = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  for (let k = 19; k > 0; k--) {
    count = 0;
    for (let j = 0; j <= 9; j++) {
      if (board[k][j] === 1) {
        count++;
      }
    }
    // If line is full
    if (count === 10) {
      linesToDelete[k] = 1;
      comboCount++;
    }
  }

  return [board, comboCount, linesToDelete];
}

export default lineFull;
