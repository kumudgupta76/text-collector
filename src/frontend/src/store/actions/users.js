import UserService from "../../services/user.service"
import { GET_USER, STOP_LOADING } from "./types";

export const getUserDetails = (id) => (dispatch) => {
    return UserService.getUserDetails(id).then(res => {
        console.log("Inside user action", res);
        dispatch({
            type:GET_USER,
            payload:res.data
        });
        dispatch({type:STOP_LOADING});
    })
}