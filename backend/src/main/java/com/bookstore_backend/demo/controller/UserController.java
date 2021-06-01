package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {
    @Autowired(required = false)
    private UserService userService;

    private boolean isSuccess = false;

    @RequestMapping(value="/login")
    public int check(@RequestBody Map<String,String> param){
        String username = param.get("username");
        String password = param.get("password");
        System.out.println("Controller " + "username " + username + " , password " + password);
        User user = userService.check(username, password);
        if(user == null){
            System.out.println("用户登录失败！");

            return 0;
        }
        if(user.getUserType() == -1){
            System.out.println("该用户已被禁用！");
            return -1;
        }
        System.out.println("用户登录成功！");
        isSuccess = true;
        int user_id = user.getUser_id();

        return user_id;
    }

    @RequestMapping("/checkSession")
    public boolean checkSession(){
        if(isSuccess == true) {
            System.out.println("nowe check true");
            return true;
        }
        else{
            System.out.println("nowe false");
            return false;
        }
    }
    @RequestMapping("/showAllUsers")
    public List<User> listUsers(){
        List<User> list = userService.listUsers();
        for(User user : list){
            System.out.println(user.getUsername() + "  " + user.getUserType());
        }
        return list;
    }

    @RequestMapping("/updateUserType")
    public int updateUserType(@RequestBody Map<String, String> param){
        return userService.updateUserType(param);
    }
}
