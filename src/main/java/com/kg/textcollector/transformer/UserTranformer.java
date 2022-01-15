package com.kg.textcollector.transformer;

import com.kg.textcollector.model.UserDetail;

import java.io.Serializable;

public class UserTranformer {
    private int id;
    private String username;
    private String name;
    private String email;
    private String token;

    public UserTranformer() {
    }

    public UserTranformer(UserDetail userDetail) {
        this.id = userDetail.getId();
        this.username = userDetail.getUsername();
        this.name = userDetail.getUsername();
        this.email = userDetail.getEmail();
        this.token = userDetail.getToken();
    }

    public UserTranformer(int id, String  username, String name, String email, String token) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
