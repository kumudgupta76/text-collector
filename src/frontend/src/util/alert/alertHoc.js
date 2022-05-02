import React from "react";

import AlertDialog from "./AlertDialog";
import ClearAlertDialog from "./ClearAlertDialog";

import _ from "lodash";

/* eslint-disable react/display-name */
const alertHoc = WrappedComponent => {
  return class extends React.Component {
    state = {
      messages: []
    };

    alertMessage = {
      error: (message, { timeout }) =>
        this.addMessage(message, "error", { timeout }),
      success: (message, { timeout }) =>
        this.addMessage(message, "success", { timeout }),
      info: (message, { timeout }) =>
        this.addMessage(message, "info", { timeout })
    };

    addMessage = (payload, type, options = {}) => {
      const { messages } = this.state;
      this.setState({
        messages: [
          {
            payload,
            type,
            id: _.now(),
            timeout: options.timeout
          },
          ...messages
        ]
      });
    };

    clearMessages = () => {
      this.setState({
        messages: []
      });
    };

    isMultipleMessagesPresent = () => _.size(this.state.messages) > 1;

    removeMessage = messageId => {
      const { messages } = this.state;
      const updatedMessages = _.filter(
        messages,
        message => message.id !== messageId
      );

      this.setState({
        messages: updatedMessages
      });
    };

    render() {
      const alertDialogs = _.map(
        this.state.messages,
        ({ payload, type, id, timeout }) => {
          return (
            <AlertDialog
              key={id}
              message={payload}
              type={type}
              timeout={timeout}
              handleOnClose={() => this.removeMessage(id)}
            />
          );
        }
      );

      return (
        <React.Fragment>
          <WrappedComponent alertMessage={this.alertMessage} />

          <div className="alerts-container">
            <div className="d-flex flex-column-reverse">{alertDialogs}</div>
            <div className="text-center">
              {this.isMultipleMessagesPresent() && (
                <ClearAlertDialog onClearClick={this.clearMessages} />
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
  };
};

export default alertHoc;
