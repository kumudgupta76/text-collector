import UserService from "../../services/user.service"
import { GET_USER, STOP_LOADING } from "./types";

export const getUserDetails = (id) => (dispatch) => {
    return UserService.getUserDetails(id).then(res => {
        dispatch({
            type:GET_USER,
            payload:res.data
        });
    })
}

export const updateUserDetails = (user) => dispatch => {
    return UserService.updateUserDetails(user).then(res => {
        dispatch({
            type:GET_USER,
            payload:res.data
        });
    })
}