package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import com.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @RequestMapping("/showAllOrders")
    public List<Order> showAllOrders(){
        List<Order> list = orderService.showAllOrders();
        for(Order order : list){
            System.out.println(order.getOrder_id() + ": " + order.getTime());
        }
        return list;
    }

    @RequestMapping("/findOneOrder")
    public Order findOrder(@RequestParam("id") Integer id){
        return orderService.findOrder(id);
    }

    @RequestMapping("/findOrderItems")
    public List<OrderItem> findOrderItems(@RequestParam("id") Integer id){
        return orderService.findOrderItems(id);
    }

    @RequestMapping("/showOneOrder")
    public List<Order> showOneOrder(@RequestBody Map<Object, Object> param){
        return orderService.showOneOrder(param);
    }

    @RequestMapping("/findOrderItemsByTime")
    public List<OrderItem> findOrderItemsByTime(@RequestBody Map<Object, Object> param){
        return orderService.findOrderItemsByTime(param);
    }

    @RequestMapping("/userFindOrderItemsByTime")
    public List<OrderItem> userFindOrderItemsByTime(@RequestBody Map<Object, Object> param) {
        return orderService.userFindOrderItemsByTime(param);
    }
}
