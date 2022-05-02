import React from "react";

const ClearAlertDialog = ({ onClearClick }) => (
  <div
    data-notify="container"
    className="alert clear-all-alert-wrapper"
    role="alert"
    data-notify-position="bottom-center"
    onClick={onClearClick}
  >
    <span>Clear All</span>
  </div>
);

export default ClearAlertDialog;
