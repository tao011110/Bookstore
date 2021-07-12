package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "order_item")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_item_id")
public class OrderItem {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "order_item_id")
    private int order_item_id;


    @Column(name = "book_id")
    private int book_id;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "num")
    private int num;

    @Column(name = "time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Timestamp time;

    @Transient
    private String name;

    public int getOrder_item_id(){
        return order_item_id;
    }

//    public int getOrder_id(){
//        return order_id;
//    }

    public BigDecimal getPrice(){
        return price;
    }

    public int getNum(){
        return num;
    }

    public int getBook_id(){
        return book_id;
    }

    public Timestamp getTime(){
        return time;
    }

    public String getName(){
        return name;
    }

    public void setOrder_item_id(int order_item_id){
        this.order_item_id = order_item_id;
    }

//    public void setOrder_id(int order_id){
//        this.order_id = order_id;
//    }

    public void setPrice(BigDecimal price){
        this.price = price;
    }

    public void setNum(int num){
        this.num = num;
    }

    public void setBook_id(int book_id){
        this.book_id = book_id;
    }

    public void setTime(Timestamp time){
        this.time = time;
    }

    public void setName(String name){
        this.name = name;
    }

    @ManyToOne(fetch = FetchType.EAGER,optional=false)
    @JoinColumn(name="order_id", nullable = false)
    private Order order;

    public Order getOrder(){
        return order;
    }

    public void setOrder(Order order){
        this.order = order;
    }
}
