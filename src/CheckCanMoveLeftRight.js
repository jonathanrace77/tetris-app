function CheckCanMoveLeftRight(
  board,
  fallTimer,
  x,
  cBlockType,
  cBlockX,
  cBlockY,
  cBlockRot,
  cBlockWidth,
  canMove,
  LeftRight
) {
  let isThereATwo = 0;
  
  // Find where the active block is
  for (var j = 0; j <= 9; j++) {
    for (var k = 19; k > 0; k--) {
      if (board[k][j] === 2) {
        isThereATwo = 1;
        // If left is pressed
        if (LeftRight === "left") {
          // If the left of the block is at the furthest left then return false || If a collision is detected then return false
          if (j === 0 || board[k][j - 1] === 1) {
            return 0;
          }
        }

        // If right is pressed
        if (LeftRight === "right") {
          // If the right of the block is at the furthest right then return false || If a collision is detected then return false
          if (j === 9 || board[k][j + 1] === 1) {
            return 0;
          }
        }
      }
    }
  }
  if (isThereATwo === 1) return 1;
}

export default CheckCanMoveLeftRight;
