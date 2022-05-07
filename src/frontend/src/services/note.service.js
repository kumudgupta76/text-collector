import axios from "../util/axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/notes";

class NoteService {
  getAllNote() {
    return axios.get(`${API_URL}?query=`, { headers: authHeader() });
  }

  getNote(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createNote(data) {
      return axios.post(`${API_URL}/add`, data, { headers: authHeader()});
  }

  searchNote(query) {
    return axios.get(`${API_URL}?query=${query}`, { headers: authHeader() });
  }

//   getUserDetailsByEmailOrUsername(str) {
//     return axios.get(`${API_URL}user?usernameOrEmail=${str}`, { headers: authHeader() });
//   }

}

export default new NoteService();
