import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/admin/";

class ConferenceService {
  submitConfDetails({ title, description, section }) {
    return axios
      .post(
        API_URL + "conf",
        { title, description, section },
        { headers: authHeader() }
      )
      .then((res) => console.log({ res }));
  }
}

export default new ConferenceService();
