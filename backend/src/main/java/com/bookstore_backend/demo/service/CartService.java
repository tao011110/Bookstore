package com.bookstore_backend.demo.service;

import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.entity.CartItemDelete;

import java.util.List;
import java.util.Map;

public interface CartService {
    List<CartItem> listItems(int user_id);
    boolean addItem(Map<Object, Object> param);
    boolean deleteItem(Map<Object, Object> param);
}
