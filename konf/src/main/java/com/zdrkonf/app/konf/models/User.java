package com.zdrkonf.app.konf.models;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document
public class User {
    
    @Id
    String id;
    String name;
    String email;
    boolean isAuthorized;
    String section;

    //@DBRef
    //private Set<Role> roles;
    //List<String> papers;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public User(String name, String email, String section){
        this.name = name;
        this.email = email;
        this.section = section;

    }

    public String toString(){
        return "User Name: " + name + " Email: " + email + " Section: " + section;
    }

}
