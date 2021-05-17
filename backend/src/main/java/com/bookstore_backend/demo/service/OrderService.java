package com.bookstore_backend.demo.service;

import java.util.Map;

public interface OrderService {
    boolean addOrder(Map<Object, Object> param);
    boolean addOrderOne(Map<Object, Object> param);
}
