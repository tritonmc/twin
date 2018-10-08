import React, { Component } from "react";
import Home from "./components/home.js";
import Dashboard from "./components/dashboard.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Snackbar } from "react-redux-snackbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/:id" component={Dashboard} />
            <Route path="/error/:id" component={Home} />
            <Route component={Home} />
          </Switch>
          <Snackbar />
        </div>
      </Router>
    );
  }
}

export default App;
