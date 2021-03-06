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

  setAuthor(id, paperName) {
    console.log("Id => ", id);
    return axios.post(
      API_URL + "setAuthor",
      { id, paperName },
      { headers: authHeader() }
    );
  }
}

export default new AdminService();
