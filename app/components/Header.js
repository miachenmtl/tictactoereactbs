var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');
var TicTacToeContainer = require("../containers/TicTacToeContainer");

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
