import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
    async login(username, password) {
        let data = {
            "username": username,
            "password": password
        }
        const response = await axios
            .post(API_URL + "login", data);
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    async signup(data) {
        const response = await axios.post(API_URL + "signup", data);
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }
}

export default new AuthService();
