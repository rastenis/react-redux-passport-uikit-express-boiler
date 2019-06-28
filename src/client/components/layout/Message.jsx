import React, { Component } from "react";
import { connect } from "react-redux";
import * as mutations from "../../store/mutations";

class Message extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      reversed: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.deleteMessage(this.props.message);
    }, 3000);
  }
  render() {
    return (
      <div
        className={`${
          this.props.message.error ? "uk-alert-danger" : "uk-alert-primary"
        }`}
        uk-alert="true"
      >
        <a className="uk-alert-close" uk-close="true" />
        <p>{this.props.message.msg}</p>
      </div>
    );
  }
}

const deleteMessage = m => {
  return mutations.deleteMessage(m);
};

const mapDispatchToProps = {
  deleteMessage
};

export const ConnectedMessage = connect(
  null,
  mapDispatchToProps
)(Message);
