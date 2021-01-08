package com.zdrkonf.app.konf.response;

import com.zdrkonf.app.konf.models.Paper;

public class PaperResponse {
    private Paper paper;
    private String message;

    public PaperResponse(Paper paper, String message) {
        this.paper = paper;
        this.message = message;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
