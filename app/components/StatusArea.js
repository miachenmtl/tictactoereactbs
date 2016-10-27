var React = require("react");
var PlayerSelect = require("./PlayerSelect");
var Well = require('react-bootstrap/lib/Well');
var Button = require('react-bootstrap/lib/Button');

function getWinnerText(winner) {
  var winnerText = "";
  if (winner > 0) {
    winnerText = "Player " + winner.toString();
  } else if (winner < 0) {
    winnerText = "Draw";
  }
  return winnerText;
}

function StatusArea(props) {
  return (
    <Well>
      <p>
        Turn: {props.winner ? "" :
          "Player " + props.turn.toString()}
      </p>
      <p>
        Winner: {getWinnerText(props.winner)}
      </p>
      <form>
        <PlayerSelect
          game={props.game}
          onChangePlayer={props.onChangePlayer}
          aiStatus={props.aiStatus}
          player="1"
        />
        <PlayerSelect
          game={props.game}
          onChangePlayer={props.onChangePlayer}
          aiStatus={props.aiStatus}
          player="2"
        />
      </form>
      <Button bsStyle="danger" onClick={props.onReset} block>Reset</Button>
    </Well>
  );
}

module.exports = StatusArea;
