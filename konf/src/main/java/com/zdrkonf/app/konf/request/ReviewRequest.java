package com.zdrkonf.app.konf.request;

import com.zdrkonf.app.konf.models.Review;

import java.util.ArrayList;
import java.util.List;

public class ReviewRequest {

    private String reviewerId;

    private String comment;

    private boolean isAccepted;

    public boolean getIsAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
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
