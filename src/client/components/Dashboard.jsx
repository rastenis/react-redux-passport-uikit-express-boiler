import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Dashboard</h1>
        {this.props.auth ? <p>Loading data...</p> : <p>Log in to view data.</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
