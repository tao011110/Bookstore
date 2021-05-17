package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.User;

public interface UserDao {
    User check(String username, String password);
}
