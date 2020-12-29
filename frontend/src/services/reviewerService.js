import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/review/";

class ReviewerService {
  addReview(paperId, reviewerId, comment, isAccepted) {
    console.log("ide u axios", isAccepted);
    return axios.post(
      API_URL + `addReview/${paperId}`,
      { reviewerId, comment, isAccepted },
      { headers: authHeader() }
    );
  }
}

export default new ReviewerService();
