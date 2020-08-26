function BlockDrop(board, i, x, cBlockType, cBlockX, cBlockRot, cBlockWidth) {
  //console.log('x', x);
  //console.log('cBlockWidth', cBlockWidth);
  /*
  if (x <= 10 - cBlockWidth + 1) {
    cBlockX = x;
  } else {
    cBlockX = 10 - cBlockWidth;
    x = 10 - cBlockWidth;
  }
  */
  cBlockX = x;

  if (cBlockType === "line") {
    // Writes current block
    if (i < 20 && (cBlockRot === 0 || cBlockRot === 2)) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
      board[i + 0][cBlockX + 3] = 2;
    } else if (i < 20 - 3 && (cBlockRot === 1 || cBlockRot === 3)) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 0] = 2;
      board[i + 3][cBlockX + 0] = 2;
    }
  }

  if (cBlockType === "square") {
    // Writes current block
    if (i < 20) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
    }
  }

  if (cBlockType === "tee") {
    // Writes current block
    if (i < 20 && cBlockRot === 0) {
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 2] = 2;
      board[i + 0][cBlockX + 1] = 2;
    } else if (i < 20 - 2 && cBlockRot === 1) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
    } else if (i < 20 && cBlockRot === 2) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
      board[i + 1][cBlockX + 1] = 2;
    } else if (i < 20 - 2 && cBlockRot === 3) {
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 2][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 0] = 2;
    }
  }

  if (cBlockType === "ess") {
    // Writes current block
    if (i < 20 && (cBlockRot === 0 || cBlockRot === 2)) {
      board[i + 0][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
    } else if (i < 20 - 2 && (cBlockRot === 1 || cBlockRot === 3)) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 1] = 2;
    }
  }

  if (cBlockType === "zee") {
    // Writes current block
    if (i < 20 && (cBlockRot === 0 || cBlockRot === 2)) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 2] = 2;
    } else if (i < 20 - 2 && (cBlockRot === 1 || cBlockRot === 3)) {
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 2][cBlockX + 0] = 2;
    }
  }

  if (cBlockType === "jay") {
    // Writes current block
    if (i < 20 - 2 && cBlockRot === 0) {
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 2][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 1] = 2;
    } else if (i < 20 && cBlockRot === 1) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 2] = 2;
    } else if (i < 20 - 2 && cBlockRot === 2) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 0] = 2;
    } else if (i < 20 && cBlockRot === 3) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
      board[i + 1][cBlockX + 2] = 2;
    }
  }

  if (cBlockType === "ell") {
    // Writes current block
    if (i < 20 - 2 && cBlockRot === 0) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 0] = 2;
      board[i + 2][cBlockX + 1] = 2;
    } else if (i < 20 && cBlockRot === 1) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
    } else if (i < 20 - 2 && cBlockRot === 2) {
      board[i + 0][cBlockX + 0] = 2;
      board[i + 0][cBlockX + 1] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 2][cBlockX + 1] = 2;
    } else if (i < 20 && cBlockRot === 3) {
      board[i + 1][cBlockX + 0] = 2;
      board[i + 1][cBlockX + 1] = 2;
      board[i + 0][cBlockX + 2] = 2;
      board[i + 1][cBlockX + 2] = 2;
    }
  }
}

export default BlockDrop;
