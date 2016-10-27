var expect = require("chai").expect;
var getMoveLogic = require("../app/logicmodules/getMoveLogic");
var checkConditionLogic = require("../app/logicmodules/checkConditionLogic");
var helperLogic = require("../app/logicmodules/helperLogic");

describe("Helper Logic Module", function() {
  describe("Get Legal Moves", function() {
    var testGrid = {
      row1: [0, 1, 2],
      row2: [2, 1, 0],
      row3: [0, 0, 1]
    };
    it("returns an array having a length corresponding to number of remaining blank squares", function() {
      var resultArray = helperLogic.getLegalMoves(testGrid);
      expect(resultArray.length).to.equal(4);
    });
    it("returns an array of coordinates of remaining blank squares", function() {
      var resultArray = helperLogic.getLegalMoves(testGrid);
      expect(resultArray[0]).to.deep.equal(["row1", 0]);
      expect(resultArray[1]).to.deep.equal(["row2", 2]);
      expect(resultArray[2]).to.deep.equal(["row3", 0]);
      expect(resultArray[3]).to.deep.equal(["row3", 1]);
    });
  });
  describe("Check Rows", function() {
    it("returns number of blank, O, and X squares in each row", function() {
      var testGrid = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var resultArray = helperLogic.checkRows(testGrid);
      expect(resultArray[0]).to.deep.equal([1, 1, 1]);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
      expect(resultArray[2]).to.deep.equal([2, 1, 0]);
    });
  });
  describe("Check Cols", function() {
    it("returns number of blank, O, and X squares in each column", function() {
      var testGrid = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var resultArray = helperLogic.checkCols(testGrid);
      expect(resultArray[0]).to.deep.equal([2, 0, 1]);
      expect(resultArray[1]).to.deep.equal([1, 2, 0]);
      expect(resultArray[2]).to.deep.equal([1, 1, 1]);
    });
  });
  describe("Check Diags", function() {
    it("returns number of blank, O, and X squares in both diagonals", function() {
      var testGrid = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var resultArray = helperLogic.checkDiags(testGrid);
      expect(resultArray[0]).to.deep.equal([1, 2, 0]);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
    });
  });
  describe("Get Position Summary", function() {
    it("concatenates results from checkRows, checkCols, and checkDiags", function() {
      var testGrid = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var resultArray = helperLogic.getPositionSummary(testGrid);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
      expect(resultArray[5]).to.deep.equal([2, 1, 0]);
      expect(resultArray[7]).to.deep.equal([1, 0, 2]);
    });
  });
  describe("Find Blank Square from Position", function() {
    it("retrieves the remaining blank square from near win condition", function() {
      var testGrid1 = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var testGrid2 = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var testGrid3 = {
        row1: [1, 2, 0],
        row2: [1, 0, 0],
        row3: [0, 0, 0]
      }
      var resultArray1 = helperLogic.findBlankSquareFromPosition(testGrid1, 7);
      var resultArray2 = helperLogic.findBlankSquareFromPosition(testGrid2, 4);
      var resultArray3 = helperLogic.findBlankSquareFromPosition(testGrid2, 6);
      var resultArray4 = helperLogic.findBlankSquareFromPosition(testGrid3, 3);
      expect(resultArray1).to.deep.equal(["row1", 2]);
      expect(resultArray2).to.deep.equal(["row3", 1]);
      expect(resultArray3).to.deep.equal(["row1", 0]);
      expect(resultArray4).to.deep.equal(["row3", 0]);
    });
  });
  describe("Get Winning Squares From Position", function() {
    it("returns the array of three squares corresponding to position", function() {
      var resultArray1 = helperLogic.getWinningSquaresFromPosition(1);
      var resultArray2 = helperLogic.getWinningSquaresFromPosition(3);
      var resultArray3 = helperLogic.getWinningSquaresFromPosition(7);
      expect(resultArray1).to.deep.equal([
        ["row2", 0],
        ["row2", 1],
        ["row2", 2]
      ]);
      expect(resultArray2).to.deep.equal([
        ["row1", 0],
        ["row2", 0],
        ["row3", 0]
      ]);
      expect(resultArray3).to.deep.equal([
        ["row1", 2],
        ["row2", 1],
        ["row3", 0]
      ]);
    });
  });
  describe("Eliminate Losing Moves", function() {
    var itString = "takes in an array of candidate moves and eliminates moves";
    itString += " that enable opponent to have two near win squares";
    it(itString, function() {
      var testGrid = {
        row1: [1, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      };
      var resultArray = helperLogic.eliminateLosingMoves(testGrid, 2);
      expect(resultArray.length).to.equal(1);
      expect(resultArray[0]).to.deep.equal(["row2", 1]);
    });
  });
});

describe("Check Condition Module", function() {
  describe("Check Win", function() {
    it("looks for a win condition and returns either -1, 0, or 1, the winner, and position code", function() {
      var testGrid1 = {
        row1: [1, 2, 0],
        row2: [2, 1, 0],
        row3: [2, 0, 1]
      };
      var testGrid2 = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var resultArray1 = checkConditionLogic.checkWin(testGrid1);
      var resultArray2 = checkConditionLogic.checkWin(testGrid2);
      expect(resultArray1).to.deep.equal([1, 1, 6]);
      expect(resultArray2).to.deep.equal([0, 0, 0]);
    });
  });
  describe("Check Near Win", function() {
    it("looks for a win condition on next move and returns a bool, the winner, and location code", function() {
      var testGrid1 = {
        row1: [1, 2, 0],
        row2: [2, 1, 0],
        row3: [2, 0, 1]
      };
      var testGrid2 = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var testGrid3 = {
        row1: [1, 1, 0],
        row2: [1, 2, 0],
        row3: [2, 2, 0]
      }
      var resultArray1 = checkConditionLogic.checkNearWin(testGrid1);
      var resultArray2 = checkConditionLogic.checkNearWin(testGrid2);
      var resultArray3 = checkConditionLogic.checkNearWin(testGrid3);
      expect(resultArray1).to.deep.equal([false, 0, 0]);
      expect(resultArray2).to.deep.equal([true, 2, 7]);
      expect(resultArray3).to.deep.equal([
        true, 1, 0,
        true, 2, 2,
        true, 2, 7
      ]);

    });
  });
  describe("Check Forced Win", function() {
    var itString = "checks if on next move it can create two near win chances ";
    itString += "while ensuring that opponent has no near win";
    it(itString, function() {
      var testGrid1 = {
        row1: [1, 2, 1],
        row2: [0, 0, 0],
        row3: [0, 2, 0]
      };
      var testGrid2 = {
        row1: [1, 0, 0],
        row2: [0, 2, 0],
        row3: [0, 0, 0]
      };
      var testGrid3 = {
        row1: [1, 0, 0],
        row2: [0, 2, 0],
        row3: [2, 0, 1]
      };
      var player = 1;
      var resultObject1 = checkConditionLogic.checkForcedWin(testGrid1, player);
      var resultObject2 = checkConditionLogic.checkForcedWin(testGrid2, player);
      var resultObject3 = checkConditionLogic.checkForcedWin(testGrid3, player);
      expect(resultObject1).to.deep.equal([true, ["row2", 1]]);
      expect(resultObject2).to.deep.equal([false, ["", 0]]);
      expect(resultObject3).to.deep.equal([true, ["row1", 2]]);
    })
  });
  describe("Check Can Get Forced Win", function() {
    var itString = "looks for moves which force opponent to allow a forced ";
    itString += "win on player's next move";
    it(itString, function() {
      var testGrid1 = {
        row1: [1, 2, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      };
      var testGrid2 = {
        row1: [1, 0, 0],
        row2: [0, 2, 0],
        row3: [0, 0, 0]
      };
      var player = 1;
      var resultObject1 = checkConditionLogic.checkCanGetForcedWin(testGrid1, player);
      var resultObject2 = checkConditionLogic.checkCanGetForcedWin(testGrid2, player);
      expect(resultObject1).to.deep.equal([
        true,
        ["row2", 0],
        ["row2", 1],
        ["row3", 0]
      ]);
      expect(resultObject2).to.deep.equal([false, ["", 0]]);
    });
  });
});

describe("getMoveLogic", function() {

});
