import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { ConnectedLogin } from "../Login";
import { ConnectedRegistration } from "../Registration";

import { ConnectedDashboard } from "../Dashboard";
import { Navigation } from "./Navigation";
import store from "../../store";
import { history } from "../../store/history";

import { Provider } from "react-redux";

export default function Layout() {
  return (
    <div>
      <Router history={history}>
        <Provider store={store}>
          <Navigation />
          <div className="uk-container uk-width-1-3 uk-margin-medium-top">
            <Route exact path="/" component={ConnectedDashboard} />
            <Route path="/login" component={ConnectedLogin} />
            <Route path="/registration" component={ConnectedRegistration} />
          </div>
        </Provider>
      </Router>
    </div>
  );
}
