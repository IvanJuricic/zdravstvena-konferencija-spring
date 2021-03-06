import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/chairman/";

class ChairmanService {
  getPapers() {
    return axios.get(API_URL + "getPapers", { headers: authHeader() });
  }

  sendConfEmail(email) {
    return axios
      .post(API_URL + "email", { email }, { headers: authHeader() })
      .then((res) => console.log(res));
  }

  setUserRole(username) {
    return axios.post(
      API_URL + "setRole",
      { username },
      { headers: authHeader() }
    );
  }

  editUserData(id, username) {
    return axios.post(
      API_URL + `editUser/${id}`,
      { username },
      { headers: authHeader() }
    );
  }
}

export default new ChairmanService();
