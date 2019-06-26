import { Redirect, Route } from "react-router";
import React from "react";
import { connect } from "react-redux";

import * as mutations from "../../store/mutations";

export class OnlyUnauthenticated extends React.Component {
  constructor(args) {
    super(args);
    this.a = args;
  }

  render() {
    return (
      <Route
        {...this.a}
        render={() =>
          this.props.auth === mutations.AUTHENTICATED ? (
            <Redirect to="/" />
          ) : (
            <Component {...this.props} />
          )
        }
      />
    );
  }
}

export class OnlyAuthenticated extends React.Component {
  constructor(args) {
    super(args);
    this.a = args;
  }

  render() {
    return (
      <Route
        {...this.a}
        render={() =>
          this.props.auth !== mutations.AUTHENTICATED ? (
            <Redirect to="/" />
          ) : (
            <Component {...this.props} />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export const ConnectedOnlyAuthenticated = connect(mapStateToProps)(
  OnlyAuthenticated
);
export const ConnectedOnlyUnauthenticated = connect(mapStateToProps)(
  OnlyUnauthenticated
);
