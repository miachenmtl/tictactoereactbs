var React = require('react');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Header = require('./Header');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <p>Would you like to play a game of tic-tac-toe?</p>
        <Link to="/game">
          <button type='button' className='btn btn-lg btn-success'>Play</button>
        </Link>
      </div>
    )
  }
});

module.exports = Home;
