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
    return axios.post(`${API_URL}/add`, data, { headers: authHeader() });
  }

  updateNote(id, data) {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
  }

  searchNote(query) {
    return axios.get(`${API_URL}?query=${query}`, { headers: authHeader() });
  }

  getAllLabel() {
    return axios.get(`http://localhost:8080/label?query=`, {
      headers: authHeader(),
    });
  }

  searchLabel(query) {
    return axios.get(`http://localhost:8080/label?query=${query}`, {
      headers: authHeader(),
    });
  }

  createLabel(data) {
    return axios.post(`http://localhost:8080/label/add`, data, {
      headers: authHeader(),
    });
  }

  updateLabel(id, data) {
    return axios.put(`http://localhost:8080/label/${id}`, data, {
      headers: authHeader(),
    });
  }

  //   getUserDetailsByEmailOrUsername(str) {
  //     return axios.get(`${API_URL}user?usernameOrEmail=${str}`, { headers: authHeader() });
  //   }
}

export default new NoteService();
