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

    private List<Review> reviews;

    public Paper(String paperName, String paperURL, List<Review> reviews) {
        this.paperName = paperName;
        this.paperURL = paperURL;
        this.reviews = reviews;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
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
