import { BrowserRouter, Switch, Route } from "react-router-dom";
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
import { history } from "../../store/history";
import ProviderWithRouter from "./ProviderWithRouter";

export default function Layout() {
  return (
    <div>
      <BrowserRouter history={history}>
        <ProviderWithRouter>
          <ConnectedNavigation />
          <ConnectedMessages />
          <div className="uk-container uk-width-1-3 uk-margin-medium-top">
            <Switch>
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
            </Switch>
          </div>
        </ProviderWithRouter>
      </BrowserRouter>
    </div>
  );
}
