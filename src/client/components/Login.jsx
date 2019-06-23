import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

class Login extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitLogin = () => {
    this.props.authenticateUser(this.state.email, this.state.password);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Login</h1>
        <form className="uk-form-stacked">
          <div className="uk-margin">
            {this.props.messages.length
              ? this.props.messages.map(m => {
                  return <p>{m.msg}</p>;
                })
              : null}
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
              <button
                type="button"
                className="uk-button uk-button-primary"
                onClick={this.submitLogin}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const authenticateUser = (e, p) => {
  console.log(e, p);
  return mutations.requestAuth(e, p);
};

const mapStateToProps = ({ auth, messages }) => ({
  auth,
  messages
});

const mapDispatchToProps = {
  authenticateUser
};

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
