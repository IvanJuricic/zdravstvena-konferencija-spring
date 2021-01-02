package com.zdrkonf.app.konf.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "papers")
public class Paper {

    @Id
    private String id;

    private String paperName;

    private String paperURL;

    private List<String> reviews;

    private boolean isAccepted;

    public Paper(String paperName, String paperURL, List<String> reviews) {
        this.paperName = paperName;
        this.paperURL = paperURL;
        this.reviews = reviews;
    }

    public boolean getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(boolean isAccepted) {
        this.isAccepted = isAccepted;
    }

    public List<String> getReviews() {
        return reviews;
    }

    public void setReviews(List<String> reviews) {
        this.reviews = reviews;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return paperName;
    }

    public void setTitle(String paperName) {
        this.paperName = paperName;
    }

    public String getUrl() {
        return paperURL;
    }

    public void setUrl(String paperURL) {
        this.paperURL = paperURL;
    }
}
