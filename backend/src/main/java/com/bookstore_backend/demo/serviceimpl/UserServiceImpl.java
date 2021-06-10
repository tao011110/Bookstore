package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired(required = false)
    private UserDao userDao;

    @Override
    public User check(String username, String password){
        System.out.println("Service " + "username " + username + " , password " + password);
        return userDao.check(username, password);
    }

    @Override
    public List<User> listUsers(){
        return userDao.listUsers();
    }

    @Override
    public int updateUserType(Map<String, String> param){

        return userDao.updateUserType(param);
    }

    @Override
    public int checkUserType(Map<String, String> param){

        return userDao.checkUserType(param);
    }

    @Override
    public List<User> getTopUser(Map<String, String> param){
        return userDao.getTopUser(param);
    }
}
