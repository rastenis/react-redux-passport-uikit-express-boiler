import React, { Component } from "react";
import { connect } from "react-redux";
import { ConnectedMessage } from "./Message";

export class Messages extends Component {
  render() {
    return (
      <div className="uk-container uk-width-1-2 uk-margin-medium-top">
        {this.props.messages.length
          ? this.props.messages.map((m, index) => {
              return <ConnectedMessage key={index} message={m} />;
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
