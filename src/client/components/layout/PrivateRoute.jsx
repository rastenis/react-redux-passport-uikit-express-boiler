import { Redirect, Route } from "react-router";
import React, { Component } from "react";
import store from "../../store";
import * as mutations from "../../store/mutations";

export const OnlyUnauthenticated = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth === mutations.AUTHENTICATED ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
