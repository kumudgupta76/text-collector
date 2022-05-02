import React from "react";
import _ from "lodash";

export const ALERT_CLASSES = {
  error: "alert-danger",
  info: "alert-info",
  success: "alert-success"
};

class AlertDialog extends React.Component {
  componentDidMount() {
    _.isNumber(this.props.timeout) &&
      (this.timer = window.setTimeout(
        this.props.handleOnClose,
        this.props.timeout
      ));
  }

  componentWillUnmount() {
    this.timer && window.clearTimeout(this.timer);
  }

  render() {
    const { message, type, handleOnClose } = this.props;

    return (
      <div
        data-notify="container"
        className={`alert ${ALERT_CLASSES[type]} animated bounce alert-dialog`}
        role="alert"
        data-notify-position="bottom-center"
      >
        <button
          onClick={handleOnClose}
          type="button"
          aria-hidden="true"
          className="close"
          data-notify="dismiss"
        >
          x
        </button>

        <span
          style={{
            wordBreak: "break-word"
          }}
        >
          {message}
        </span>
      </div>
    );
  }
}

export default AlertDialog;
