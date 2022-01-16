package com.kg.textcollector.model;

import com.kg.textcollector.util.JsonToMapConverter;
import org.springframework.data.annotation.Reference;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String summary;

    @Column(columnDefinition = "json")
    private String data;

    private int user_id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
