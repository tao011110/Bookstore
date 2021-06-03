package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
    @Query("from OrderItem where order_id = :id")
    List<OrderItem> findOrderItems(Integer id);
}
