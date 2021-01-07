import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/review/";

class ReviewerService {
  addReview(paper, reviewerId, users, comment, status) {
    return axios.post(
      API_URL + `addReview/${paper.id}`,
      { reviewerId, users, comment, status },
      { headers: authHeader() }
    );
  }
}

export default new ReviewerService();
