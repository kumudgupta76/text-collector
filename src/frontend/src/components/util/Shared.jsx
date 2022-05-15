import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function () {
    const localState = useSelector((state) => _.pick(state, ['shared', 'auth']));

    

    return (
        _.get(localState, 'shared.loading') ?
        <Backdrop open={true} >
            <CircularProgress color="inherit" />
        </ Backdrop> :<></>
    )
}