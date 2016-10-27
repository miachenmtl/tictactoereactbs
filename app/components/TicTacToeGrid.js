var React = require("react");
var PropTypes = React.PropTypes;

function TicTacToeGrid(props) {
  return (
    <table className="centered">
      <tbody>
        <TicTacTowRow {...props} rowPos="topRow" className="row" row="1"/>
        <TicTacTowRow {...props} rowPos="" className="row" row="2" />
        <TicTacTowRow {...props} rowPos="bottomRow" className="row" row="3" />
      </tbody>
    </table>
  );
}

function TicTacTowRow(props) {
  return (
    <tr>
      <td className="column">
        <TicTacToeBox {...props} col="1" colPos="leftCol" rowPos={props.rowPos} />
      </td>
      <td className="column">
        <TicTacToeBox {...props} col="2" colPos="" rowPos={props.rowPos} />
      </td>
      <td className="column">
        <TicTacToeBox {...props} col="3" colPos="rightCol" rowPos={props.rowPos} />
      </td>
    </tr>
  );
}

TicTacTowRow.propTypes = {
  rowPos: PropTypes.string
}

function TicTacToeBox(props) {
  var classString= "square " + props.colPos + " " + props.rowPos;
  var rowName = "row" + props.row;
  var colNum = props.col - 1;
  var output = ["", "O", "X"];
  var outputIndex = props.grid[rowName][colNum];
  var bgColor = getBgColor(rowName, colNum, props.winSquares);
  return (
    <div className={classString} style={bgColor} onClick={
          props.onUserClick.bind(
            null,
            props.grid,
            props.row,
            props.col,
            props.turn
      )}>
      <p className="mark">{output[outputIndex]}</p>
    </div>
  );
}

TicTacToeBox.propTypes = {
  colPos: PropTypes.string,
  rowPos: PropTypes.string,
  row: PropTypes.string.isRequired,
  col: PropTypes.string.isRequired,
  grid: PropTypes.object.isRequired,
  turn: PropTypes.number.isRequired,
  onUserClick: PropTypes.func.isRequired,
  winSquares: PropTypes.array.isRequired
}

function getBgColor(rowName, colNum, winSquares) {
  if (checkIfWinningSquare(rowName, colNum, winSquares)) {
    return {
      backgroundColor: '#33cc33'
    }
  }
  return {
    backgroundColor: '#fcf8e3'
  }
}

function checkIfWinningSquare(rowName, colNum, winSquares) {
  return winSquares.some(function(square) {
    return (square[0] === rowName && square[1] === colNum)
  })
}

module.exports = TicTacToeGrid;
