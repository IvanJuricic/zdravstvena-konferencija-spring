package com.zdrkonf.app.konf.request;

import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.models.User;

import java.util.ArrayList;
import java.util.List;

public class ReviewRequest {

    private String reviewerId;

    private String comment;

    private String status;

    private List<User> users;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
