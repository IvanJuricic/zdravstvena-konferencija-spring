import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/paper/";

class PaperService {
  uploadPaper(paperURL, paperName, id) {
    return axios.post(
      API_URL + `upload/${id}`,
      { paperURL, paperName },
      { headers: authHeader() }
    );
  }

  sendConfEmail(email) {
    return axios.post(API_URL + "email", { email }, { headers: authHeader() });
  }

  getUserPapers(id) {
    return axios.get(API_URL + `paper/${id}`, { headers: authHeader() });
  }
}

export default new PaperService();
