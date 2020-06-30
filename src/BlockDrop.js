function BlockDrop(board, i, x){
let blockType = 'line';

if(blockType === 'line'){
    if(i > 0 && i< 20){
        board[i-1][x+0] = 0;
        board[i-1][x+1] = 0;
        board[i-1][x+2] = 0;
        board[i-1][x+3] = 0;
    };    
    if(i<20){
        board[i][x+0] = 1; 
        board[i][x+1] = 1;
        board[i][x+2] = 1;
        board[i][x+3] = 1;
    };
}

if(blockType === 'square'){
    if(i<19){
        board[i][0] = 1; 
        board[i+1][0] = 1;
        board[i][1] = 1;
        board[i+1][1] = 1;
    };
    if(i > 0 && i< 19){
        board[i-1][0] = 0;
        board[i-1][1] = 0;
    };    
}

if(blockType === 'tee'){
    if(i<19){
        board[i+1][0] = 1; 
        board[i+1][1] = 1;
        board[i+1][2] = 1;
        board[i][1] = 1;
    };
    if(i > 0 && i< 19){
        board[i][0] = 0;
        board[i-1][1] = 0;
        board[i][2] = 0;
    };    
}

if(blockType === 'lRight'){
    if(i<18){
        board[i][0] = 1; 
        board[i+1][0] = 1;
        board[i+2][0] = 1;
        board[i+2][1] = 1;
    };
    if(i > 0 && i< 18){
        board[i-1][0] = 0;
        board[i+1][1] = 0;
    };    
}





    return board;
}

export default BlockDrop

