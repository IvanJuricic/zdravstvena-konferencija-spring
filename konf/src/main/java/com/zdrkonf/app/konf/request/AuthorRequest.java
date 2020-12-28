package com.zdrkonf.app.konf.request;

public class AuthorRequest {

    private String paperName;

    private String id;

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
