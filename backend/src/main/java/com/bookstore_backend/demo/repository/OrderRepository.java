package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("select o from Order o")
    List<Order> showAllOrders();
}
