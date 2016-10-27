var React = require("react");
var Jumbotron = require('react-bootstrap/lib/Jumbotron');

/** Stateless functional react component
  * @param {object} props Properties
  * @return {object} render
  */
function Header(props) {
  return (
    <Jumbotron>
      <h1>Tic-Tac-Toe</h1>
      <h4>An Implementation of Tic-Tac-Toe using React Bootstrap</h4>
    </Jumbotron>
  );
}

module.exports = Header;
