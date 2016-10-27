var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Home = require("./components/Home");
var GameContainer = require("./containers/GameContainer");

var routes = (
  <Router history={hashHistory}>
    <Route path = "/" component={Home} />
    <Route path="game" component={GameContainer} />
  </Router>
);

module.exports = routes;
