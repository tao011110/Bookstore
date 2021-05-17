package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/addOrder")
    public boolean addOrder(@RequestBody Map<Object, Object> param){
        boolean flag = orderService.addOrder(param);
        if(flag == true){
            return true;
        }
        System.out.println("订单添加失败");
        return false;
    }

    @RequestMapping("/addOrderOne")
    public boolean addOrderOne(@RequestBody Map<Object, Object> param){
        boolean flag = orderService.addOrderOne(param);
        if(flag == true){
            return true;
        }
        System.out.println("订单添加失败");
        return false;
    }
}
