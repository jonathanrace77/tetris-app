import React, { Component } from "react";
import { render } from "react-dom";
import BlockDrop from "./BlockDrop.js";
import ArrowKey from "./ArrowKey.js";

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      key: 0
    };
    this.boardCreator = this.boardCreator.bind(this);
    this.fallLogic = this.fallLogic.bind(this);
  }

  boardCreator() {
    const styleFilled = {
      background: "#444",
    };

    const styleEmpty = {
      background: "#EEE",
    };

    let boardArray = [];

    for (let i = 0; i < 20; i++) {
      boardArray[i] = this.state.board[i].map((value, index) => {
        return <div style={value ? styleFilled : styleEmpty} key={index}></div>;
      });
    }
    return boardArray;
  }

  // Handles the fall sequence
  fallLogic() {
    let i = 0;
    let x = 0;
    // Loop for blocks to drop
    setInterval(function () {
      
        // Handle Arrow Key Press
        function handleArrowKey(e){
            console.log(x);
              if(e.key === 'ArrowRight'){
                  x++;
              } 
        }
        
        document.addEventListener("keydown", e => handleArrowKey(e));
      

      this.setState((prevState) => {
        var board = prevState.board;
        var key = prevState.key;
        console.log('This x', x);
        // Blocks to drop down function
        BlockDrop(board, i, x);

        return { board: board };
      });

      i++;
      
    }.bind(this), 200);
  }

  

  componentDidMount() {
    this.fallLogic();
  }

  render() {
    return <div className="Board">{this.boardCreator()}</div>;
  }
}

export default Board;
