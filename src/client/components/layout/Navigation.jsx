import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as mutations from "../../store/mutations";

class Navigation extends Component {
  render() {
    return (
      <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li
              className="uk-logo uk-text-middle uk-navbar-item"
              style={{ fontWeight: "bold" }}
            >
              boiler
            </li>
            <li className="uk-margin-large-right" />
            <li>
              <NavLink
                exact
                activeStyle={{ className: "uk-active", color: "black" }}
                to="/"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          {this.props.auth == mutations.AUTHENTICATED ? (
            <ul className="uk-navbar-nav">
              <li>
                <NavLink exact className="uk-text-danger" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="uk-navbar-nav">
              <li>
                <NavLink
                  exact
                  activeStyle={{ className: "uk-active", color: "black" }}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeStyle={{ className: "uk-active", color: "black" }}
                  to="/registration"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
