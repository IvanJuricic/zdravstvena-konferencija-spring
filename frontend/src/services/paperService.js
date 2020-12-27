import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/paper/";

class PaperService {
  uploadPaper(paperURL, paperName) {
    return axios
      .post(
        API_URL + "upload",
        { paperURL, paperName },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log({ res });
      });
  }

  sendConfEmail(email) {
    return axios
      .post(API_URL + "email", { email }, { headers: authHeader() })
      .then((res) => console.log(res));
  }
}

export default new PaperService();
