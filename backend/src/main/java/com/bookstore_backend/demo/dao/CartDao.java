package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.entity.CartItemDelete;

import java.util.List;

public interface CartDao {
    List<CartItem> listItems(int user_id);
    boolean addItem(String s);
    boolean deleteItem(List<String> sqlList);
}
