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
}

export default new ChairmanService();
