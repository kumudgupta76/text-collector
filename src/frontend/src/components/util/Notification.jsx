import * as React from "react";

import { CloseOutlined as CloseIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Button, IconButton, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { clearMessage } from "../../store/actions/shared";

export default function () {
  const localState = useSelector((state) => _.pick(state, ["shared"]));

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    dispatch(clearMessage());
  };

  return _.get(localState, "shared.message") ? (
    <Snackbar open={_.get(localState, "shared.message", false)} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal:'right', vertical:'top'}}>
        <Alert onClose={handleClose} severity={_.get(localState, "shared.message.type")} sx={{ width: '100%' }}>
          {_.get(localState, "shared.message.text")}
        </Alert>
      </Snackbar>
  ) : (
    <></>
  );
}
