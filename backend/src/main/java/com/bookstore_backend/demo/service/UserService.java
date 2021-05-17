package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.User;

public interface UserService {
    User check(String username, String password);
}
