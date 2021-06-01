package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    @Override
    public List<User> listUsers(){
        List<User> listResult = userRepository.listUsers();

        return listResult;
    }

    @Override
    public int updateUserType(Map<String, String> param) {
        System.out.println("modify user type");
        String sid = String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(sid);
        System.out.println("user_id  "+ user_id);
        String stype = String.valueOf(param.get("user_type"));
        int user_type = Integer.valueOf(stype);
        System.out.println("user_type  "+ user_type);

        return userRepository.updateUserType(user_id, user_type);
    }
}
