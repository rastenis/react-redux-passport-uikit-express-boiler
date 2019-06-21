import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

export class Login extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Login</h1>
        <form className="uk-form-stacked" onSubmit={authenticateUser}>
          <div className="uk-margin">
            {this.props.authenticated === mutations.AUTH_ERROR ? (
              <p>Bad credentials!</p>
            ) : null}
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Email
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
            </div>
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Password
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className="uk-input"
                id="form-stacked-text"
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
            <div className="uk-form-controls uk-margin-small-bottom">
              <button className="uk-button uk-button-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const authenticateUser = e => {
  e.preventDefault();
  console.log(e.target.email.value, e.target.password.value);
  return mutations.requestAuth(e.target.email.value, e.target.password.value);
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = {
  authenticateUser
};

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
