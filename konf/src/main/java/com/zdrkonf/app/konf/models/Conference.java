package com.zdrkonf.app.konf.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "conference")
public class Conference {

    @Id
    private String id;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Conference(@NotBlank String title, @NotBlank String description, String section) {
        this.title = title;
        this.description = description;
        this.section = section;
    }
}
