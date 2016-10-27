var React = require("react");
var TicTacToeGrid = require("../components/TicTacToeGrid");
var getMoveLogic = require("../logicmodules/getMoveLogic");
var StatusArea = require("../components/StatusArea");
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');

var TicTacToeContainer = React.createClass({
  getInitialState: function() {
    return {
      grid: {
        row1: [0, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      },
      turn: 1,
      winner: 0,
      ai: [0, 0]
    };
  },
  handleClick: function(grid, row, col, currentTurn) {
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = grid;
    var nextMoveResult = {};
    var aiStatus = this.state.ai;
    var that = this;
    if (
        (newGrid[rowName][colNum] === 0 || aiStatus[currentTurn - 1] > 0) &&
        currentTurn > 0
      ) {
      nextMoveResult = getMoveLogic.getNextMove(
        newGrid,
        rowName,
        colNum,
        currentTurn,
        aiStatus
      );
      if (nextMoveResult.winCondition[0] === 1) {
        this.handleWin(nextMoveResult.winCondition);
        this.setState({
          grid: nextMoveResult.newGrid
        });
        return;
      } else if (nextMoveResult.winCondition[0] === -1) {
        this.setState({
          grid: nextMoveResult.newGrid,
          turn: -1,
          winner: -1
        });
      } else {
        newGrid = nextMoveResult.newGrid;
        currentTurn = 2 - (++nextMoveResult.currentTurn % 2);
        this.setState({
          grid: newGrid,
          turn: currentTurn
        });
        if (aiStatus[currentTurn - 1] > 0) {
          window.setTimeout(function() {
            that.handleClick(newGrid, 1, 1, currentTurn);
          }, 250);
        }
      }
    }
  },
  handleWin: function(winCondition) {
    this.setState({
      turn: 0,
      winner: winCondition[1]
    });
  },
  handleReset: function() {
    this.setState({
      grid: {
        row1: [0, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      },
      turn: 1,
      winner: 0
    });
  },
  handleChangePlayer: function(player) {
    var newAIStatus = this.state.ai;
    var idString = "statusOfPlayer" + player;
    idString += "onGame" + this.props.game;
    newAIStatus[player - 1] = document.getElementById(idString).selectedIndex;
    this.setState({
      ai: newAIStatus
    });
  },
  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} xsOffset={3}>
            <h4>To prompt AI to move, click Next Move button or any blank square.</h4>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} sm={8}>
            <TicTacToeGrid
              grid={this.state.grid}
              turn={this.state.turn}
              onUserClick={this.handleClick}
            />
          </Col>
          <Col xs={12} sm={4} >
            <StatusArea
              game={this.props.game}
              turn={this.state.turn}
              win={this.state.win}
              winner={this.state.winner}
              onReset={this.handleReset}
              onChangePlayer={this.handleChangePlayer}
              aiStatus={this.state.ai}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
})

module.exports = TicTacToeContainer;
