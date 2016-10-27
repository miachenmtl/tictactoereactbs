var React = require("react");
var ReactDOM = require("react-dom");
var Header = require("../components/Header");
var TicTacToeContainer = require("./TicTacToeContainer");

var GameContainer2 = React.createClass({
  render: function() {
    return(
      <div>
        <Header />
        <h4>To prompt AI to mosfqwerqwerqwerve, click Next Move button or any blank square.</h4>
        <TicTacToeContainer />
      </div>
    );
  }
});

module.exports = GameContainer2;
