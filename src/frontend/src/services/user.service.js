import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

class UserService {
  getAllUsers() {
    return axios.get(`${API_URL}users`, { headers: authHeader() });
  }

  getUserDetails(id) {
    return axios.get(`${API_URL}user/${id}`, { headers: authHeader() });
  }

  getUserDetailsByEmailOrUsername(str) {
    return axios.get(`${API_URL}user?usernameOrEmail=${str}`, { headers: authHeader() });
  }

}

export default new UserService();
