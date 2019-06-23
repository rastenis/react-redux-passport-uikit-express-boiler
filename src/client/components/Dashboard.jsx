import React, { Component } from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="uk-header-medium uk-text-center">Dashboard</h1>
        {this.props.messages.length
          ? this.props.messages.map((m, index) => {
              return (
                <div
                  key={index}
                  class={m.error ? "uk-alert-danger" : "uk-alert-primary"}
                  uk-alert="true"
                >
                  <a class="uk-alert-close" uk-close="true" />
                  <p>{m.msg}</p>
                </div>
              );
            })
          : null}
        {this.props.auth ? <p>Loading data...</p> : <p>Log in to view data.</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, messages }) => ({
  auth,
  messages
});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
