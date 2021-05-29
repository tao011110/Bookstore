package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;

    @Override
    public User check(String username, String password){
        try {
            User userResult = userRepository.checkUser(username, password);
            System.out.println("登陆成功!");

            return userResult;
        }
        catch (Exception e) {
            System.out.println("登陆失败!");

            return null;
        }
    }
}
