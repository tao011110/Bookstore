package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Cart;
import com.bookstore_backend.demo.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Integer>  {
    @Query(value = "from CartItem where cart_id = :cart_id")
    List<CartItem> getCartItemByCart_id(int cart_id);
}
