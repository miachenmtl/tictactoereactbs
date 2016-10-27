var React = require("react");
var PropTypes = React.PropTypes;
var TicTacToeGrid = require("../components/TicTacToeGrid");
var getMoveLogic = require("../logicmodules/getMoveLogic");
var helperLogic = require("../logicmodules/helperLogic");
var StatusArea = require("../components/StatusArea");
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');

var TicTacToeContainer = React.createClass({
  propTypes: {
    game: PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      grid: {
        row1: [0, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      },
      turn: 1,
      winner: 0,
      ai: [0, 0],
      winSquares: []
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
    var winningSquares = helperLogic.getWinningSquaresFromPosition(winCondition[2]);
    this.setState({
      turn: 0,
      winner: winCondition[1],
      winSquares: winningSquares
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
      winner: 0,
      winSquares: []
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
  handleNextMove: function() {
    if (this.state.ai[this.state.turn - 1] > 0) {
      this.handleClick(this.state.grid, 1, 1, this.state.turn);
    }
  },
  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} sm={6} smOffset={3}>
            <h4>If AI does not automatically move, click Next Move button or
            any blank square to prompt next move.</h4>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={12} sm={8}>
            <TicTacToeGrid
              grid={this.state.grid}
              turn={this.state.turn}
              onUserClick={this.handleClick}
              winSquares={this.state.winSquares}
            />
          </Col>
          <Col xs={6} xsOffset={3} sm={4} smOffset={0}>
            <StatusArea
              game={this.props.game}
              turn={this.state.turn}
              win={this.state.win}
              winner={this.state.winner}
              onNextMove={this.handleNextMove}
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
