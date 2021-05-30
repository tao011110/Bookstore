package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.CartItem;

import java.util.List;
import java.util.Map;

public interface CartDao {
    List<CartItem> listItems(int user_id);
    boolean addItem(Map<Object, Object> param);
    boolean deleteItem(Map<Object, Object> param);
}
