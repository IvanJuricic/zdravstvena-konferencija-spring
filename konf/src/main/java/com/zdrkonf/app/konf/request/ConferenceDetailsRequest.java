package com.zdrkonf.app.konf.request;

import javax.validation.constraints.NotBlank;

public class ConferenceDetailsRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String section;

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
