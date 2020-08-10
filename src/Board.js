import React, { Component } from "react";
import BlockDrop from "./BlockDrop.js";
import CalculateBlockWidth from "./CalculateBlockWidth.js";
import CheckCanMove from "./CheckCanMove.js";
import CheckCanMoveLeftRight from "./CheckCanMoveLeftRight.js";
import checkGameOver from "./CheckGameOver.js";
import RenderToBG from "./RenderToBG.js";
import shapeGen from "./ShapeGen.js";
import lineFull from "./LineFull.js";

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
      dropSpeed: 450,
      key: 0,
      x: 3,
      fallTimerCount: 0,
      cBlockType: shapeGen(),
      cBlockX: 0,
      cBlockY: 0,
      cBlockRot: 0,
      cBlockWidth: 4,
      cBlockMaxWidth: 4,
      canMove: 1,
      renderComplete: 1,
      score: 100,
      isDownPressed: 0,
    };
    this.boardCreator = this.boardCreator.bind(this);
    this.fallLogic = this.fallLogic.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
    this.fallTimer = this.fallTimer.bind(this);
    this.moveBlockDown = this.moveBlockDown.bind(this);
  }

  // Builds initial board, includes CSS rules
  boardCreator() {
    const styleCurrent = {
      background: "#01CDCD",
      borderStyle: "outset",
    };

    const styleFilled = {
      background: "#787878",
      borderStyle: "outset",
    };

    const styleEmpty = {
      background: "#EEE",
    };

    // Create a board 10 * 20
    let boardArray = [];

    for (let i = 0; i < 20; i++) {
      boardArray[i] = this.state.board[i].map((value, index) => {
        return (
          <div
            style={
              value === 1 ? styleFilled : value == 2 ? styleCurrent : styleEmpty
            }
            key={index}
          ></div>
        );
      });
    }
    return boardArray;
  }

  // Handle Arrow Key Press Down
  handleArrowKey(e) {
    this.setState({ iskeyFuncTriggered: 0 });
    if (e.key === "ArrowRight") {
      this.setState((prevState) => {
        if (
          CheckCanMoveLeftRight(
            this.state.board,
            this.state.fallTimerCount,
            this.state.x,
            0,
            0,
            0,
            0,
            0,
            0,
            "right"
          )
        ) {
          console.log('Checkpoint 3 - Success', this.state.x);
          return { x: prevState.x++ };
        }
      });
    }

    if (e.key === "ArrowLeft") {
      this.setState((prevState) => {
        if (
          CheckCanMoveLeftRight(
            this.state.board,
            this.state.fallTimerCount,
            this.state.x,
            0,
            0,
            0,
            0,
            0,
            0,
            "left"
          )
        ) {
          return { x: prevState.x-- };
        }
      });
    }

    if (e.key === "ArrowUp") {
      let newVar = this.state.cBlockRot;
      if (
        this.state.x < 10 - this.state.cBlockMaxWidth + 1 &&
        this.state.fallTimerCount <= 20 - this.state.cBlockMaxWidth
      ) {
        if (newVar < 3) {
          newVar++;
        } else {
          newVar = 0;
        }
      }

      this.setState((prevState) => {
        let newBlockWidth = CalculateBlockWidth(prevState.cBlockType, newVar);

        return { cBlockRot: newVar, cBlockWidth: newBlockWidth };
      });
    }

    if (e.key === "ArrowDown") {
      this.setState({
        isDownPressed: 1,
      });
    }

    if (e.key === "Enter") {
      // For debug only
    }
  }

  // Handle Arrow Key Press Up
  handleArrowKeyUp(e) {
    this.setState({ iskeyFuncTriggered: 0 });
    if (e.key === "ArrowDown") {
      this.setState({
        isDownPressed: 0,
      });
    }
  }

  // Handles the fall sequence - refreshes every 1ms
  fallLogic() {
    // Event listeners
    document.addEventListener("keydown", (e) => {
      if (!this.state.iskeyFuncTriggered) {
        this.handleArrowKey(e);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (!this.state.iskeyFuncTriggered) {
        this.handleArrowKeyUp(e);
      }
    });
    // Loop for blocks to drop
    setInterval(
      function () {


        this.setState((prevState) => {
          var board = prevState.board;
          var key = prevState.key;
          var cBlockType = prevState.cBlockType;
          var cBlockX = prevState.cBlockX;
          var cBlockY = prevState.cBlockY;
          var cBlockRot = prevState.cBlockRot;
          var cBlockWidth = prevState.cBlockWidth;
          var fallTimerCount = prevState.fallTimerCount;
          var x = prevState.x;
          //var canMove = prevState.canMove;
          var renderComplete = prevState.renderComplete;
          var isDownPressed = prevState.isDownPressed;

          let trialBoard = this.state.board;
          let canMove = CheckCanMove(trialBoard);

          if (canMove) {
            // Clear the board of current block
            for (let j = 0; j < 10; j++) {
              for (let k = 0; k < 20; k++) {
                if (board[k][j] === 2) {
                  board[k][j] = 0;
                }
              }
            }

            // Blocks to drop down function
            BlockDrop(
              trialBoard,
              fallTimerCount,
              x,
              cBlockType,
              cBlockX,
              cBlockY,
              cBlockRot,
              cBlockWidth,
              canMove,
              isDownPressed
            );
          }

          this.setState(
            // Checks if the block can move
            {
              canMove: canMove,
            }
          );

          return {
            board: board,
            cBlockX: cBlockX,
            renderComplete: renderComplete,
          };
        });
      }.bind(this),
      1
    );
  }

  moveBlockDown() {
    setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var fallTimerCount = prevState.fallTimerCount;
          var isDownPressed = prevState.isDownPressed;
          let canMove = CheckCanMove(board);

          if (canMove) {
            var additionalCount = 0;
            if (isDownPressed) {
              additionalCount++;
              // Then make the block drop quicker somehow
              this.setState(
                // Checks if the block can move
                {
                  //fallTimerCount: (fallTimerCount + additionalCount)
                }
              );
            }
          }

          return {
            board: board,
            fallTimerCount: fallTimerCount + additionalCount,
          };
        });
      }.bind(this),
      50
    );
  }

  // This is the loop that resets every block drop (set by fallTimerCount)
  fallTimer() {
    setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var canMove = prevState.canMove;
          var x = prevState.x;
          var newTimerCount = prevState.fallTimerCount;
          var cBlockType = prevState.cBlockType;
          var cBlockWidth = prevState.cBlockWidth;
          var cBlockMaxWidth = prevState.cBlockMaxWidth;
          var cBlockRot = prevState.cBlockRot;
          var score = prevState.score;

          //newTimerCount = prevState.fallTimerCount++;

          let secondCanMove = CheckCanMove(board);

          // Renders to BG and updates state as to whether the rendering is complete
          if (!canMove) {
            //renderComplete = 0;
            let returnFromRender = RenderToBG(board, 1);
            //renderComplete = returnFromRender[1];
            board = returnFromRender[0];
          }

          if (canMove && newTimerCount < 20) {
            if (!prevState.isDownPressed) {
              newTimerCount = prevState.fallTimerCount++;
            }
          } else {
            // Check for a complete line
            let checkLineComplete = lineFull(board, score);
            board = checkLineComplete[0];
            let newScore = checkLineComplete[1];
            this.setState({ score: newScore });

            newTimerCount = 0;
            //canMove = 1;
            cBlockType = shapeGen();
            cBlockWidth = CalculateBlockWidth(cBlockType, 0);
            cBlockRot = 0;
            x = 3;

            // Game Over Sequence
            if (checkGameOver(board, 1, 1, cBlockType)) {
              this.setState({ score: 0 });
              for (let j = 0; j < 10; j++) {
                for (let k = 0; k < 20; k++) {
                  board[k][j] = 0;
                }
              }
            }
          }

          return {
            fallTimerCount: newTimerCount,
            canMove: canMove,
            board: board,
            cBlockType: cBlockType,
            cBlockWidth: cBlockWidth,
            cBlockMaxWidth: cBlockMaxWidth,
            cBlockRot: cBlockRot,
            x: x,
          };
        });
      }.bind(this),
      this.state.dropSpeed
    );
  }

  componentDidMount() {
    this.fallTimer();
    this.fallLogic();
    this.moveBlockDown();
  }

  render() {
    return (
      <div>
        <div className="Board">{this.boardCreator()}</div>
        <div className="ScoreBoard">{this.state.score}</div>
      </div>
    );
  }
}

export default Board;
