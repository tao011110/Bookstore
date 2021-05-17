package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.OrderDao;
import com.bookstore_backend.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    private int orderID = 1;
    @Autowired
    private OrderDao orderDao;

    @Override
    public boolean addOrder(Map<Object, Object> param){
        orderID++;
        String sorder_id=  String.valueOf(param.get("order_id"));
        int order_id = orderID;
        String suser_id=  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(suser_id);
        String stotalmoney =  String.valueOf(param.get("totalmoney"));
        int totalmoney = Integer.valueOf(stotalmoney);
        String sbooks = String.valueOf((param.get("books")));
        System.out.println("sbooks");
        System.out.println(sbooks);
        List<Integer> book_ids = new ArrayList<>();
        List<Integer> prices = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();
        String str1[] = sbooks.split("},");
        System.out.println(str1[0]);
        for(String s : str1){
            String str2[] = s.split(", ");
            for(String ss : str2){
                if(ss.charAt(0) == 'n' && ss.charAt(1) == 'u'){
                    int num = 0;
                    for(int i = 4; i < ss.length(); i++){
                        num = num * 10 + ss.charAt(i) - '0';
                    }
                    nums.add(num);
                    continue;
                }
                if(ss.charAt(0) == 'p'){
                    int price = 0;
                    for(int i = 6; i < ss.length(); i++){
                        price = price * 10 + ss.charAt(i) - '0';
                    }
                    prices.add(price);
                    continue;
                }
                if(ss.charAt(1) == '{'){
                    int id = 0;
                    for(int i = 10; i < ss.length(); i++){
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
        System.out.println("create order at:"+ts.toString());

        System.out.println(user_id +" " + totalmoney);
        String s1 = "insert into mybookstore.orders(order_id, user_id, totalmoney, time)"
                + " values(" + order_id + "," + user_id + ", " + totalmoney + ", \"" + ts.toString() +
                "\");";

        List<String> sqlList = new ArrayList<>();
        for(int i = 0; i < book_ids.size(); i++){
            String sql = "insert into mybookstore.orderItem(order_id, book_id, price, num, time)"
                    + " values(" + order_id + ", " + book_ids.get(i)+ ", " + prices.get(i) + ", " +
                    nums.get(i) + ", \""   + ts.toString() +
                    "\");";
            sqlList.add(sql);
        }

        return orderDao.addOrder(s1, sqlList);
    }
    @Override
    public boolean addOrderOne(Map<Object, Object> param){
        orderID++;
        String sorder_id=  String.valueOf(param.get("order_id"));
        int order_id = orderID;
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

        System.out.println(user_id +" " + totalmoney);
        String s1 = "insert into mybookstore.orders(order_id, user_id, totalmoney, time)"
                + " values(" + order_id + "," + user_id + ", " + totalmoney + ", \"" + ts.toString() +
                "\");";

        String s2 = "insert into mybookstore.orderItem(order_id, book_id, price, num, time)"
                + " values(" + order_id + ", " + book_id + ", " + totalmoney + ", " +
                num+ ", \""   + ts.toString() +
                "\");";

        System.out.println(s2);

        return orderDao.addOrderOne(s1, s2);
    }
}
