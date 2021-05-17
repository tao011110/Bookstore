package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("用户登录成功！");
        isSuccess = true;
        int user_id = user.getUserId();

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

}
