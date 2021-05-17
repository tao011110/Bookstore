package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.CartItem;

import java.util.List;

public interface CartDao {
    List<CartItem> listItems(String s);
    boolean addItem(String s);
    boolean deleteItem(List<String> sqlList);
}
