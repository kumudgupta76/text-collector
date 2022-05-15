package com.kg.textcollector.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "users")
public class User extends Auditable{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    private String password;

    private Boolean isActive = true;

    private String role= "USER";

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        this.isActive = active;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public User() {
    }

    public User(UserDetail userDetail) {
        this.id = userDetail.getId();
        this.username = userDetail.getUsername();
        this.email = userDetail.getEmail();
        this.password = userDetail.getPassword();
        this.isActive = userDetail.isActive();
    }
}