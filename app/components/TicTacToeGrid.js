var React = require("react");

function TicTacToeGrid(props) {
  return (
    <table>
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

function TicTacToeBox(props) {
  var classString= "square " + props.colPos + " " + props.rowPos;
  var rowName = "row" + props.row.toString();
  var colNum = props.col - 1;
  var output = ["", "O", "X"];
  var outputIndex = props.grid[rowName][colNum];
  return (
    <div className={classString} onClick={
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

module.exports = TicTacToeGrid;
