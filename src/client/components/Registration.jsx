import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

class Registration extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      email: "",
      password: "",
      passwordConf: "",
      error: this.props.error || ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitRegistration = () => {
    this.props.registerUser(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Register</h1>
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
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Confirm Password
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className="uk-input"
                id="form-stacked-text"
                name="passwordConf"
                type="password"
                placeholder="Confirm password"
                onChange={this.onChange}
                value={this.state.passwordConf}
              />
            </div>
            <div className="uk-form-controls uk-margin-small-bottom">
              <button
                type="button"
                className="uk-button uk-button-secondary"
                onClick={this.submitRegistration}
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

const registerUser = (e, p) => {
  console.log(e, p);
  return mutations.requestAccountCreation(e, p);
};

const mapStateToProps = ({ auth, messages }) => ({
  auth,
  messages
});

const mapDispatchToProps = {
  registerUser
};

export const ConnectedRegistration = connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
