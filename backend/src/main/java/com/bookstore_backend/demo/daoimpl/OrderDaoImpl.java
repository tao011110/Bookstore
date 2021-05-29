package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.OrderDao;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import com.bookstore_backend.demo.repository.OrderItemRepository;
import com.bookstore_backend.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public boolean addOrder(Map<Object, Object> param){
        try {
            String suser_id = String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(suser_id);
            String stotalmoney = String.valueOf(param.get("totalmoney"));
            int totalmoney = Integer.valueOf(stotalmoney);
            String sbooks = String.valueOf((param.get("books")));
            System.out.println("sbooks");
            System.out.println(sbooks);
            List<Integer> book_ids = new ArrayList<>();
            List<Integer> prices = new ArrayList<>();
            List<Integer> nums = new ArrayList<>();
            String str1[] = sbooks.split("},");
            System.out.println(str1[0]);
            for (String s : str1) {
                String str2[] = s.split(", ");
                for (String ss : str2) {
                    if (ss.charAt(0) == 'n' && ss.charAt(1) == 'u') {
                        int num = 0;
                        for (int i = 4; i < ss.length(); i++) {
                            num = num * 10 + ss.charAt(i) - '0';
                        }
                        nums.add(num);
                        continue;
                    }
                    if (ss.charAt(0) == 'p') {
                        int price = 0;
                        for (int i = 6; i < ss.length(); i++) {
                            price = price * 10 + ss.charAt(i) - '0';
                        }
                        prices.add(price);
                        continue;
                    }
                    if (ss.charAt(1) == '{') {
                        int id = 0;
                        for (int i = 10; i < ss.length(); i++) {
                            id = id * 10 + ss.charAt(i) - '0';
                        }
                        book_ids.add(id);
                    }
                }
            }
            System.out.println(book_ids);
            System.out.println(prices);
            System.out.println(nums);

            long time = Calendar.getInstance().getTimeInMillis();
            java.sql.Timestamp ts = new java.sql.Timestamp(time);
            System.out.println("create order at:" + ts.toString());

            Order newOrder = new Order();
            newOrder.setTotalmoney(totalmoney);
            newOrder.setUser_id(user_id);
            newOrder.setTime(ts.toString());
            Order result = orderRepository.save(newOrder);
            System.out.println("\nfinish into orders\n");
            int order_id = result.getOrder_id();

            for (int i = 0; i < book_ids.size(); i++) {
                OrderItem newOrderItem = new OrderItem();
                newOrderItem.setOrder_id(order_id);
                newOrderItem.setTime(ts.toString());
                newOrderItem.setPrice(prices.get(i));
                newOrderItem.setBook_id(book_ids.get(i));
                newOrderItem.setNum(nums.get(i));
                orderItemRepository.save(newOrderItem);
            }
            System.out.println("\nfinish into order_item\n");
        }
        catch(Exception e){
            System.out.println("不可重复添加！");
            return false;
        }
        return true;
    }

    @Override
    public boolean addOrderOne(Map<Object, Object> param){

        try {
            String suser_id=  String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(suser_id);
            String stotalmoney =  String.valueOf(param.get("totalmoney"));
            int totalmoney = Integer.valueOf(stotalmoney);
            String sbook_id = String.valueOf((param.get("book_id")));
            int book_id = Integer.valueOf(sbook_id);
            String snum = String.valueOf((param.get("num")));
            int num = Integer.valueOf(snum);


            long time = Calendar.getInstance().getTimeInMillis();
            java.sql.Timestamp ts = new java.sql.Timestamp(time);
            System.out.println("create order at:"+ts.toString());


            Order newOrder = new Order();
            newOrder.setTotalmoney(totalmoney);
            newOrder.setUser_id(user_id);
            newOrder.setTime(ts.toString());
            Order result = orderRepository.save(newOrder);
            int order_id = result.getOrder_id();

            System.out.println("\nfinish into orders\n");
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.setOrder_id(order_id);
            newOrderItem.setTime(ts.toString());
            newOrderItem.setPrice(totalmoney);
            newOrderItem.setBook_id(book_id);
            newOrderItem.setNum(num);
            orderItemRepository.save(newOrderItem);
            System.out.println("\nfinish into order_item\n");

            return true;
        }
        catch(Exception e){
            System.out.println("不可重复添加！");

            return false;
        }
    }
}
