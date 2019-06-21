import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { ConnectedLogin } from "../Login";
import { Dashboard } from "../Dashboard";
import { Navigation } from "./Navigation";
import store from "../../store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <Navigation />
          <div className="uk-container uk-width-1-3 uk-margin-medium-top">
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={ConnectedLogin} />
          </div>
        </Provider>
      </Router>
    </div>
  );
}
