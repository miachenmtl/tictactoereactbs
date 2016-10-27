var helperLogic = require('./helperLogic');

exports.checkWin = function(grid) {
  var i;
  var j;
  var positionSummary = helperLogic.getPositionSummary(grid);
  var movesLeft = helperLogic.getLegalMoves(grid).length;
  // For each player, go through position summary
  for (i = 1; i < 3; i++) {
    for (j = 0; j < 8; j++) {
      if (positionSummary[j][i] === 3) {
        return [1, i, j];
      }
    }
  }
  if (movesLeft === 0) {
    return [-1, 0, 0];
  }
  return [0, 0, 0];
};

exports.checkNearWin = function(grid) {
  var i;
  var j;
  var positionSummary = helperLogic.getPositionSummary(grid);
  var result = [];
  // For each player, go through position summary
  for (i = 1; i < 3; i++) {
    for (j = 0; j < 8; j++) {
      if (positionSummary[j][0] === 1 && positionSummary[j][i] === 2) {
        result = result.concat([true, i, j]);
      }
    }
  }
  if (result.length === 0) {
    result = [false, 0, 0];
  }
  return result;
};

exports.checkForcedWin = function(grid, turn) {
  var i;
  var j;
  var aiGrid;
  var nearWin;
  var numOfNearWins;
  var result = [];
  var isForcedWin = [false];
  var oppTurn = 2 - ((turn + 1) % 2);
  var legalMoves = helperLogic.getLegalMoves(grid);
  var numLegalMoves = legalMoves.length;
  var candidateMoveIndexArray = [];
  for (i = 0; i < numLegalMoves; i++) {
    candidateMoveIndexArray[i] = true;
  }
  for (i = 0; i < numLegalMoves; i++) {
    // Make deep copy of grid
    aiGrid = JSON.parse(JSON.stringify(grid));
    aiGrid[legalMoves[i][0]][legalMoves[i][1]] = turn;
    nearWin = exports.checkNearWin(aiGrid);
    if (nearWin.length > 3) {
      numOfNearWins = nearWin.length / 3;
      for (j = 0; j < numOfNearWins; j++) {
        if (nearWin[3 * j + 1] === oppTurn) {
          candidateMoveIndexArray[i] = false;
        }
      }
    } else {
      candidateMoveIndexArray[i] = false;
    }
  }
  for (i = 0; i < numLegalMoves; i++) {
    if (candidateMoveIndexArray[i]) {
      isForcedWin = [true];
      result.push(legalMoves[i]);
    }
  }
  if (isForcedWin[0]) {
    return (isForcedWin.concat(result));
  }
  return [false, ["", 0]];
};

exports.checkCanGetForcedWin = function(grid, player) {
  var i;
  var aiGrid;
  var nearWin;
  var forcedWin;
  var result = [];
  var canGetForcedWin = [false];
  var oppMove;
  var opp = 2 - ((player + 1) % 2);
  var legalMoves = helperLogic.getLegalMoves(grid);
  var numLegalMoves = legalMoves.length;
  var candidateMoveIndexArray = [];
  for (i = 0; i < numLegalMoves; i++) {
    // Make deep copy of grid
    aiGrid = JSON.parse(JSON.stringify(grid));
    aiGrid[legalMoves[i][0]][legalMoves[i][1]] = player;
    nearWin = exports.checkNearWin(aiGrid);
    if (nearWin[0]) {
      oppMove = helperLogic.findBlankSquareFromPosition(aiGrid, nearWin[2]);
      aiGrid[oppMove[0]][oppMove[1]] = opp;
      forcedWin = exports.checkForcedWin(aiGrid, player);
      if (forcedWin[0]) {
        canGetForcedWin = [true];
        candidateMoveIndexArray[i] = true;
      } else {
        candidateMoveIndexArray[i] = false;
      }
    } else {
      candidateMoveIndexArray[i] = false;
    }
  }
  for (i = 0; i < numLegalMoves; i++) {
    if (candidateMoveIndexArray[i]) {
      result.push(legalMoves[i]);
    }
  }
  if (canGetForcedWin[0]) {
    return (canGetForcedWin.concat(result));
  }
  return [false, ["", 0]];
}
