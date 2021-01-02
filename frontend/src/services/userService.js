import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getUserData(id) {
    return axios.get(API_URL + `user/${id}`, { headers: authHeader() });
  }

  getPaperData(id) {
    return axios.get(API_URL + `paper/${id}`, { headers: authHeader() });
  }

  getPaperReviews(id) {
    return axios.get(API_URL + `review/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
