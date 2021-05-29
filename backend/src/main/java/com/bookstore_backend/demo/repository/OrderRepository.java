package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer> {

}
