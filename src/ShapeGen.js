function shapeGen(
  board,
  i,
  x,
  cBlockType,
  cBlockX,
  cBlockY,
  cBlockRot,
  cBlockWidth,
  canMove
) {
  let shapeArray = ['line', 'ess', 'zee', 'square', 'tee', 'jay', 'ell'];

  return shapeArray[Math.floor(Math.random() * 7)];
  
}

export default shapeGen;
