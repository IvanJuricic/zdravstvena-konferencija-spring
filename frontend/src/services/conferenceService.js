import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class ConferenceService {
  submitConfDetails({ title, description }) {
    return axios
      .post(API_URL + "conf", { title, description }, { headers: authHeader() })
      .then((res) => console.log({ res }));
  }
}

export default new ConferenceService();
