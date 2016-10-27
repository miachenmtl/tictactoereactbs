var React = require('react');
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var Header = require('./Header');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Grid = require('react-bootstrap/lib/Grid');
var Well = require('react-bootstrap/lib/Well');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Grid>
          <Row className="show-grid">
            <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
              <Well bsSize="large" className="homePrompt">
                <p>Would you like to play a game of Tic-Tac-Toe?</p>
                <Link to="/game">
                  <button type='button' className='btn btn-lg btn-success'>
                    Play
                  </button>
                </Link>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
});

module.exports = Home;
