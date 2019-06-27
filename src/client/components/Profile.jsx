import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      oldPassword: "",
      newPassword: "",
      newPasswordConf: "",
      errors: []
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitPasswordChange = () => {
    // clearing previous errors
    this.state.errors = [];

    // invalid password length
    if (this.state.password.length < 5 || this.state.password.length > 100) {
      this.props.addMessage({
        error: true,
        msg: "Password must be between 5 and a 100 characters!"
      });
      this.state.errors.push("password");
      return;
    }

    // non-matching passwords
    if (this.state.newPassword != this.state.newPassword) {
      this.props.addMessage({
        error: true,
        msg: "Passwords do not match!"
      });
      this.state.errors.push("password");
      return;
    }

    // proceeding
    this.props.changePassword(this.state.newPassword);
  };

  submitUnlinkAuth = e => {
    // proceeding
    this.props.unlinkAuth(e.target.name.replace("Unlink", ""));
  };

  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Profile</h1>
        <hr />
        <div
          style={{ width: "60%" }}
          className="uk-form-stacked uk-container uk-container-center"
        >
          <div className="uk-margin">
            <h3>Change Password</h3>
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Old Password
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className={`uk-input ${
                  this.state.errors.find(e => e == "password")
                    ? "uk-form-danger"
                    : null
                }`}
                id="form-stacked-text"
                name="oldPassword"
                type="password"
                placeholder="Old Password"
                onChange={this.onChange}
                value={this.state.oldPassword}
              />
            </div>
            <label className="uk-form-label" htmlFor="form-stacked-text">
              New Password
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className={`uk-input ${
                  this.state.errors.find(e => e == "password")
                    ? "uk-form-danger"
                    : null
                }`}
                id="form-stacked-text"
                name="newPassword"
                type="password"
                placeholder="New Password"
                onChange={this.onChange}
                value={this.state.newPassword}
              />
            </div>
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Confirm New Password
            </label>
            <div className="uk-form-controls uk-margin-small-bottom">
              <input
                className={`uk-input ${
                  this.state.errors.find(e => e == "password")
                    ? "uk-form-danger"
                    : null
                }`}
                id="form-stacked-text"
                name="newPasswordConf"
                type="password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.newPasswordConf}
              />
            </div>
            <div className="uk-form-controls uk-margin-small-bottom">
              <button
                type="button"
                className="uk-button uk-button-secondary uk-width-expand"
                onClick={this.submitRegistration}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div
          style={{ width: "60%" }}
          className="uk-form-stacked uk-container uk-container-center"
        >
          <h3>Linked Accounts</h3>
          wip
        </div>
      </div>
    );
  }
}

const changePassword = p => {
  return mutations.requestPasswordChange(p);
};

const unlinkAuth = name => {
  return mutations.requestAuthUnlink(name);
};
const addMessage = m => {
  return mutations.addMessage(m);
};

const mapStateToProps = ({ auth, messages, data }) => ({
  auth,
  messages,
  data
});

const mapDispatchToProps = {
  changePassword,
  unlinkAuth,
  addMessage
};

export const ConnectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
