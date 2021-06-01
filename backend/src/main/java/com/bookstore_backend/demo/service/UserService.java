package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    User check(String username, String password);
    List<User>listUsers();
    int updateUserType(Map<String, String> param);
}
