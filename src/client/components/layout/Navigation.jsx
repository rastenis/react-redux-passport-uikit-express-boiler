import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-logo">
            <Link to="/">Boiler</Link>
          </li>
          <li className="uk-margin-large-right" />
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li className="uk-active">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
