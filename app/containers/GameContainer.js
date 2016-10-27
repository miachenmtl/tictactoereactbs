var React = require("react");
var ReactDOM = require("react-dom");
var Header = require("../components/Header");
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');
var TicTacToeContainer = require("./TicTacToeContainer");

var GameContainer = React.createClass({
  getInitialState: function() {
    return {
      games: ["Tab 1", "Tab 2"]
    }
  },
  handleSelect: function(key) {
    var newGamesArray = this.state.games;
    var numOfGames = newGamesArray.length;
    if (key === numOfGames) {
      newGamesArray.push("Tab " + (numOfGames + 1));
    }
    console.log(newGamesArray);
    this.setState({
      games: newGamesArray
    })
  },
  render: function() {
    return(
      <div>
        <Header />
        <Tabs
          defaultActiveKey={0}
          id="GameTabs"
          onSelect={this.handleSelect}
        >
          {this.state.games.map((game, index) => (
            <Tab eventKey={index} key={index} title={game}>
              <TicTacToeContainer game={index}/>
            </Tab>
          ))}
          <Tab
            eventKey={this.state.games.length}
            title="Add Tab"
          >
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = GameContainer;
