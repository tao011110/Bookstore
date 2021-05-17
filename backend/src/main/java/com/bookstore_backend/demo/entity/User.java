package com.bookstore_backend.demo.entity;

public class User {
    private int userId;
    private String username;
    private String password;
    private int user_type;

    public int getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public int getUserType() {
        return user_type;
    }

    public void setUserType(Integer user_type) {
        this.user_type = user_type;
    }
}
