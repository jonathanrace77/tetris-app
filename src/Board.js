import React from "react";
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
      cBlockMaxWidth: 4,
      canMoveDown: 1,
      renderComplete: 1,
      score: 100,
      isDownPressed: 0,
      comboCount: 5,
    };
    this.boardCreator = this.boardCreator.bind(this);
    this.fallLogic = this.fallLogic.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
    this.fallTimer = this.fallTimer.bind(this);
    this.arrowBlockDown = this.arrowBlockDown.bind(this);
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
              value === 1 ? styleFilled : value === 2 ? styleCurrent : styleEmpty
            }
            key={index}
          ></div>
        );
      });
    }
    return boardArray;
  }

  // Handles Arrow Key Press Down
  handleArrowKey(e) {
    this.setState({ iskeyFuncTriggered: 0 });

    if (e.key === "ArrowRight") {
      this.setState((prevState) => {
        if (CheckCanMoveLeftRight(this.state.board, "right")) {
          return { x: prevState.x++ };
        }
      });
    }

    if (e.key === "ArrowLeft") {
      this.setState((prevState) => {
        if (CheckCanMoveLeftRight(this.state.board, "left")) {
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
  }

  // Handles Arrow Key Press Up
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
    // Loop for blocks to drop
    setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var cBlockType = prevState.cBlockType;
          var cBlockX = prevState.cBlockX;
          var cBlockRot = prevState.cBlockRot;
          var cBlockWidth = prevState.cBlockWidth;
          var fallTimerCount = prevState.fallTimerCount;
          var x = prevState.x;
          var renderComplete = prevState.renderComplete;

          var canMoveDown = CheckCanMove(board);

          // Clear the board of current block if can move, then calls blockDrop()
          if (canMoveDown) {
            for (let j = 0; j < 10; j++) {
              for (let k = 0; k < 20; k++) {
                if (board[k][j] === 2) {
                  board[k][j] = 0;
                }
              }
            }

            // Blocks to drop down function
            BlockDrop(
              board,
              fallTimerCount,
              x,
              cBlockType,
              cBlockX,
              cBlockRot,
              cBlockWidth
            );
          }

          // Writes canMoveDown to state
          this.setState({
            canMoveDown: canMoveDown,
          });

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

  // Handles down arrow movement - refreshes every 50ms
  arrowBlockDown() {
    setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var fallTimerCount = prevState.fallTimerCount;
          var isDownPressed = prevState.isDownPressed;
          let canMoveDown = CheckCanMove(board);

          if (canMoveDown) {
            var additionalCount = 0;
            if (isDownPressed) {
              additionalCount++;
            }
          }

          return {
            board: board,
            fallTimerCount: fallTimerCount + additionalCount,
            cBlockWidth: CalculateBlockWidth(
              this.state.cBlockType,
              this.state.cBlockRot
            ),
          };
        });
      }.bind(this),
      50
    );
  }

  // Handles timer of block dropping - refreshes according to fallTimerCount
  fallTimer() {
    setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var canMoveDown = prevState.canMoveDown;
          var x = prevState.x;
          var newTimerCount = prevState.fallTimerCount;
          var cBlockType = prevState.cBlockType;
          var cBlockWidth = prevState.cBlockWidth;
          var cBlockMaxWidth = prevState.cBlockMaxWidth;
          var cBlockRot = prevState.cBlockRot;
          var comboCount = prevState.comboCount;

          // Renders to BG and updates state as to whether the rendering is complete
          if (!canMoveDown) {
            let returnFromRender = RenderToBG(board, 1);
            board = returnFromRender[0];
          }

          // Update the timer if able to move down
          if (canMoveDown && newTimerCount < 20) {
            if (!prevState.isDownPressed) {
              newTimerCount = prevState.fallTimerCount++;
            }
          } else {
            newTimerCount = 0;
            cBlockType = shapeGen();
            cBlockWidth = CalculateBlockWidth(cBlockType, 0);
            cBlockRot = 0;
            x = 3;

            // Check for a complete line
            let checkLineComplete = lineFull(board);
            board = checkLineComplete;

            // Game Over Sequence
            if (checkGameOver(board, cBlockType)) {
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
            canMoveDown: canMoveDown,
            board: board,
            comboCount: comboCount,
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
    this.arrowBlockDown();
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
  }

  render() {
    return (
      <div>
      <h1>Tetris</h1>
        <div className="Board">{this.boardCreator()}</div>
        <div className="ScoreBoard">{/*this.state.score*/}</div>
      </div>
    );
  }
}

export default Board;
