package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.User;

import java.util.List;
import java.util.Map;

public interface UserDao {
    User check(String username, String password);
    List<User> listUsers();
    int updateUserType(Map<String, String> param);
    int checkUserType(Map<String, String> param);
    List<User> getTopUser(Map<String, String> param);
}
