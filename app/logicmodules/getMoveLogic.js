var checkConditionLogic = require('./checkConditionLogic');
var helperLogic = require('./helperLogic');


exports.getNextMove = function(newGrid, rowName, colNum, currentTurn, aiStatus) {
  var winCondition;
  if (aiStatus[currentTurn - 1]) {
    newGrid = getAIMove(
      newGrid,
      currentTurn,
      aiStatus[currentTurn - 1]
    );
  } else {
    newGrid[rowName][colNum] = currentTurn;
  }
  winCondition = checkConditionLogic.checkWin(newGrid);
  return {winCondition, newGrid, currentTurn};
};

function getAIMove(grid, turn, aiStatus) {
  var i;
  var numLegalMoves;
  var legalMoves;
  var nextMove;
  var nearWin;
  var numOfNearWins;
  var forcedWin;
  var candidateMoves;
  legalMoves = helperLogic.getLegalMoves(grid);
  numLegalMoves = legalMoves.length;
  if (aiStatus === 1) {
    grid = getRandomMove(grid, legalMoves, turn);
    return grid;
  } else if (aiStatus === 2) {
    nearWin = checkConditionLogic.checkNearWin(grid);
    if (nearWin[0]) {
      numOfNearWins = nearWin.length / 3;
      for (i = 0; i < numOfNearWins; i++) {
        if (3 * i + 1 === turn) {
          nextMove = helperLogic.findBlankSquareFromPosition(
            grid,
            nearWin[3 * i + 2]);
          grid[nextMove[0]][nextMove[1]] = turn;
          return grid;
        }
      }
      nextMove = helperLogic.findBlankSquareFromPosition(grid, nearWin[2]);
      grid[nextMove[0]][nextMove[1]] = turn;
      return grid;
    }
    if (numLegalMoves > 0) {
      grid = getRandomMove(grid, legalMoves, turn);
    }
    return grid;
  }
  else if (aiStatus === 3) {
    // First, check for near win
    nearWin = checkConditionLogic.checkNearWin(grid);
    if (nearWin[0]) {
      numOfNearWins = nearWin.length / 3;
      for (i = 0; i < numOfNearWins; i++) {
        if (3 * i + 1 === turn) {
          nextMove = helperLogic.findBlankSquareFromPosition(
            grid,
            nearWin[3 * i + 2]);
          console.log("Player " + turn + " moved at " + nextMove);
          grid[nextMove[0]][nextMove[1]] = turn;
          return grid;
        }
      }
      nextMove = helperLogic.findBlankSquareFromPosition(grid, nearWin[2]);
      console.log("Player " + turn + " moved at " + nextMove);
      grid[nextMove[0]][nextMove[1]] = turn;
      return grid;
    } else {
      // Second, check for immediate forced win
      forcedWin = checkConditionLogic.checkForcedWin(grid, turn);
      if (forcedWin[0]) {
        forcedWin.shift();
        candidateMoves = forcedWin;
      } else {
        // Third, check if can get forced move on next move
        forcedWin = checkConditionLogic.checkCanGetForcedWin(grid, turn);
        if (forcedWin[0]) {
          forcedWin.shift();
          candidateMoves = forcedWin;
        } else {
          // Finally, eliminate losing moves
          candidateMoves = eliminateLosingMoves(grid, turn);
        }
      }
      grid = getRandomMove(grid, candidateMoves, turn);
      return grid;
    }
  }
};

function eliminateLosingMoves(grid, player) {
  var i;
  var aiGrid;
  var forcedWin;
  var canGetForcedWin;
  var result = [];
  var opp = 2 - ((player + 1) % 2);
  var legalMoves = helperLogic.getLegalMoves(grid);
  var numLegalMoves = legalMoves.length;
  var candidateMoveIndexArray = [];
  for (i = 0; i < numLegalMoves; i++) {
    aiGrid = JSON.parse(JSON.stringify(grid));
    aiGrid[legalMoves[i][0]][legalMoves[i][1]] = player;
    forcedWin = checkConditionLogic.checkForcedWin(aiGrid, opp);
    canGetForcedWin = checkConditionLogic.checkCanGetForcedWin(aiGrid, opp);
    if (forcedWin[0]) {
      candidateMoveIndexArray[i] = false;
    } else if (canGetForcedWin[0]) {
      candidateMoveIndexArray[i] = false;
    } else {
      candidateMoveIndexArray[i] = true;
    }
  }
  for (i = 0; i < numLegalMoves; i++) {
    if (candidateMoveIndexArray[i]) {
      result.push(legalMoves[i]);
    }
  }
  return result;
};

function getRandomMove(grid, candidateMoves, turn) {
  var numCandidateMoves = candidateMoves.length;
  var nextMoveIndex = Math.floor(Math.random() * numCandidateMoves);
  var nextMove = candidateMoves[nextMoveIndex];
  console.log("Player " + turn + " moved at " + nextMove);
  grid[nextMove[0]][nextMove[1]] = turn;
  return grid;
};
