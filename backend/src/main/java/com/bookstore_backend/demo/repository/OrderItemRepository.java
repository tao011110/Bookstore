package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem,Integer> {
    @Query("select item from OrderItem item where item.order.order_id = :id")
    List<OrderItem> findOrderItems(Integer id);

//    @Query("select book_id,price, sum(num) as sumnum from OrderItem where order_id = any(select order_id from Order where ((time > :minDate and time < :maxDate) or time like :maxDate%))" +
//            "group by book_id, price order by sumnum DESC")
//    List<List<Integer>> findOrderItemsByTime(String minDate, String maxDate);

    @Query("select item from OrderItem item where item.order.order_id = any(select order_id from Order where (time > :minDate and time < :maxDate))")
    List<OrderItem> findOrderItemsByTime(Timestamp minDate, Timestamp maxDate);

//    @Query(" select book_id,price, sum(num) as sumnum from OrderItem where order_id = any(select order_id from Order where ((time > :minDate and time < :maxDate) or time like :maxDate%)" +
//            "and user_id = :user_id) group by book_id, price order by sumnum DESC")
//    List<OrderItem> userFindOrderItemsByTime(String minDate, String maxDate, int user_id);
    @Query(" select item from OrderItem item where item.order.order_id = any(select order_id from Order where (time > :minDate and time < :maxDate) and user_id = :user_id)")
    List<OrderItem> userFindOrderItemsByTime(Timestamp minDate, Timestamp maxDate, int user_id);
}
