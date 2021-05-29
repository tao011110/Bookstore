package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "orders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "order_id")
public class Order {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "order_id")
    private int order_id;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "totalmoney")
    private int totalmoney;

    @Column(name = "time")
    private String time;

    public int getOrder_id(){
        return order_id;
    }
    public int getUser_id(){
        return user_id;
    }
    public int getTotalmoney(){
        return totalmoney;
    }

    public String getTime(){
        return time;
    }

    public void setOrder_id(int order_id){
        this.order_id = order_id;
    }

    public void setUser_id(int user_id){
        this.user_id = user_id;
    }

    public void setTotalmoney(int totalmoney){
        this.totalmoney = totalmoney;
    }

    public void setTime(String time){
        this.time = time;
    }
}
