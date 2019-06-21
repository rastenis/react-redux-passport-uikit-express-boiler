import React from "react";
import { Link, NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-logo">
            <Link to="/">Boiler</Link>
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
          <li>
            <NavLink
              exact
              activeStyle={{ className: "uk-active", color: "black" }}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
