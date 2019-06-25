import { Router, Route } from "react-router-dom";
import React from "react";

// components
import { ConnectedLogin } from "../Login";
import { ConnectedRegistration } from "../Registration";
import { ConnectedDashboard } from "../Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { OnlyUnauthenticated, OnlyAuthenticated } from "./PrivateRoute";
import { ConnectedMessages } from "./Messages";
import { ConnectedUserInformation } from "../UserInformation";

// store
import store from "../../store";
import { history } from "../../store/history";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <div>
      <Router history={history}>
        <Provider store={store}>
          <ConnectedNavigation />
          <ConnectedMessages />
          <div className="uk-container uk-width-1-3 uk-margin-medium-top">
            <Route exact path="/" component={ConnectedDashboard} />
            <OnlyUnauthenticated path="/login" component={ConnectedLogin} />
            <OnlyAuthenticated
              path="/user/:index"
              component={ConnectedUserInformation}
            />
            <OnlyUnauthenticated
              path="/registration"
              component={ConnectedRegistration}
            />
          </div>
        </Provider>
      </Router>
    </div>
  );
}
