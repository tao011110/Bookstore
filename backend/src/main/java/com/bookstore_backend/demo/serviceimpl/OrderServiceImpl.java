package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.OrderDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import com.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Override
    public boolean addOrder(Map<Object, Object> param){

        return orderDao.addOrder(param);
    }
    @Override
    public boolean addOrderOne(Map<Object, Object> param){

        return orderDao.addOrderOne(param);
    }

    @Override
    public List<Order> showAllOrders() {
        return orderDao.showAllOrders();
    }

    @Override
    public List<Order> showOneOrder(Map<Object, Object> param) {
        return orderDao.showOneOrder(param);
    }

    @Override
    public Order findOrder(Integer id){
        return orderDao.findOrder(id);
    }

    @Override
    public List<OrderItem> findOrderItems(Integer id){
        return orderDao.findOrderItems(id);
    }
}
