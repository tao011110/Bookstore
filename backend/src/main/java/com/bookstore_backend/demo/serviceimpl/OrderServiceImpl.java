package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.OrderDao;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    private int orderID = 0;

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
}
