import React, { Component } from "react";
import Home from "./components/home.js";
import Dashboard from "./components/dashboard.js";
import Saved from "./components/saved";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Snackbar } from "react-redux-snackbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/saved" component={Saved} />
            <Route path="/error/:id" component={Home} />
            <Route path="/:id" component={Dashboard} />
            <Route component={Home} />
          </Switch>
          <Snackbar />
        </div>
      </Router>
    );
  }
}

export default App;
