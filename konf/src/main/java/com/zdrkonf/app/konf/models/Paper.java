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

    //private List<String> comments;

    public Paper(String title, String url) {
        this.paperName = title;
        this.paperURL = url;
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

    public void setTitle(String title) {
        this.paperName = title;
    }

    public String getUrl() {
        return paperURL;
    }

    public void setUrl(String url) {
        this.paperURL = url;
    }
}
