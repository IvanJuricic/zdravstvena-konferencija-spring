package com.zdrkonf.app.konf.request;

import javax.validation.constraints.NotBlank;

public class PaperRequest {

    private String paperName;

    private String paperURL;

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getPaperURL() {
        return paperURL;
    }

    public void setPaperURL(String paperURL) {
        this.paperURL = paperURL;
    }
}
