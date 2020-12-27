import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class AdminService {
  getAllUsers() {
    return axios.get(API_URL + "getAll", { headers: authHeader() });
  }

  setUserRole(username) {
    return axios.post(
      API_URL + "setRole",
      { username },
      { headers: authHeader() }
    );
  }
}

export default new AdminService();
