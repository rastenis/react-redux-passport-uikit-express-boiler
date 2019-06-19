import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <div>
      <Router>
        <Navigation />
        <div className="uk-container uk-width-1-3 uk-margin-medium-top">
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </div>
  );
}
