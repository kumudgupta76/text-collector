import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/note";

class NoteService {
  getAllNote() {
    return axios.get(`${API_URL}`, { headers: authHeader() });
  }

  getNote(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createNote(data) {
      return axios.post(`${API_URL}/add`, data, { headers: authHeader()});
  }

//   getUserDetailsByEmailOrUsername(str) {
//     return axios.get(`${API_URL}user?usernameOrEmail=${str}`, { headers: authHeader() });
//   }

}

export default new NoteService();
