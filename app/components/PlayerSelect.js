var React = require('react');
var PropTypes = React.PropTypes;
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');

function PlayerSelect(props) {
  var playerOptions = ["Human", "Clueless AI", "Not too bright AI", "Smart AI"];
  var idString = "statusOfPlayer" + props.player;
  idString += "onGame" + props.game;
  return (
    <FormGroup>
      <ControlLabel>Player {props.player}</ControlLabel>
      <FormControl
        componentClass="select"
        id={idString}
        onChange={props.onChangePlayer.bind(null, props.player)}
        value={playerOptions[props.aiStatus[props.player - 1]]}
      >
        <option value="Human" default>Human</option>
        <option value="Clueless AI">Clueless AI</option>
        <option value="Not too bright AI">Not too bright AI</option>
        <option value="Smart AI">Smart AI</option>
      </FormControl>
    </FormGroup>
  )
}

PlayerSelect.propTypes = {
  player: PropTypes.string.isRequired,
  game: PropTypes.number.isRequired,
  aiStatus: PropTypes.array.isRequired,
  onChangePlayer: PropTypes.func.isRequired
}

module.exports = PlayerSelect;
