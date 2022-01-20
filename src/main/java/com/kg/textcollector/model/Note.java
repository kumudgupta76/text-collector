package com.kg.textcollector.model;

import javax.persistence.*;

@Entity
@Table(name = "notes")
public class Note extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String summary;

    @Column(columnDefinition = "json")
    private String data;

    private int userId;

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
