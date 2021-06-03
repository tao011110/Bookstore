package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    boolean addOrder(Map<Object, Object> param);
    boolean addOrderOne(Map<Object, Object> param);
    List<Order> showAllOrders();
}
