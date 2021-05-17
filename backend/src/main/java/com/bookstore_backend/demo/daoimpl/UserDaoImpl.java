package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public User check(String username, String password){
        System.out.println(username);
        String sql = "select * from mybookstore.users where username = ? and password = ?";
        try {
            User userResult = jdbcTemplate.queryForObject(sql,
                    new BeanPropertyRowMapper<User>(User.class),
                    username, password);
            System.out.println("登陆成功!");

            return userResult;
        }  catch (Exception e) {
            System.out.println("登陆失败!");
            /*List<User> listResult = jdbcTemplate.query("select * from mybookstore.users",
                    new BeanPropertyRowMapper<User>(User.class));
            for(User l : listResult){
                System.out.println(l.getUsername() + "  " + l.getPassword());
            }*/
            return null;
        }
    }
}
