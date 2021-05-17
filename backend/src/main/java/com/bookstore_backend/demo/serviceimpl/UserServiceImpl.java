package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired(required = false)
    private UserDao userDao;

    public User check(String username, String password){
        System.out.println("Service " + "username " + username + " , password " + password);
        return userDao.check(username, password);
    }
}
