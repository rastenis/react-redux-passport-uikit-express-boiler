import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Login</h1>
        <form className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Username
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="text"
                placeholder="Username"
              />
            </div>
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Password
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
