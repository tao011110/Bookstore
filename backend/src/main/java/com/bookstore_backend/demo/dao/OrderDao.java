package com.bookstore_backend.demo.dao;

import java.util.List;
import java.util.Map;

public interface OrderDao {
    boolean addOrder(String s1, List<String> sqlList);
    boolean addOrderOne(String s1, String s2);
}
