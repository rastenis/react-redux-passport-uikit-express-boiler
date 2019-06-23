import React, { Component } from "react";
import { connect } from "react-redux";

export class Messages extends Component {
  // not bothering with message removals from state, because messages do not persist refreshes
  render() {
    return (
      <div className="uk-container uk-width-1-2 uk-margin-medium-top">
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
      </div>
    );
  }
}

const mapStateToProps = ({ messages }) => ({
  messages
});

export const ConnectedMessages = connect(mapStateToProps)(Messages);
