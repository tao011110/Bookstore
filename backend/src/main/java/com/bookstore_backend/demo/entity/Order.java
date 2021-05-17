package com.bookstore_backend.demo.entity;

public class Order {
    private int order_id;
    private int user_id;
    private int totalmoney;
    private int order_item_id;
    private int book_id;
    private int price;

    public int getOrder_id(){
        return order_id;
    }
    public int getUser_id(){
        return user_id;
    }

}
