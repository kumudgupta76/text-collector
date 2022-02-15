import axios from "../util/axios";
import authHeader from "./auth-header";

class UserService {
  getAllUsers() {
    return axios.get(`users`, { headers: authHeader() });
  }

  getUserDetails(id) {
    return axios.get(`user/${id}`, { headers: authHeader() });
  }

  getUserDetailsByEmailOrUsername(str) {
    return axios.get(`user?usernameOrEmail=${str}`, { headers: authHeader() });
  }

}

export default new UserService();
