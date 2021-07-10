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
import java.util.List;

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
    @JsonSerialize(using= ToStringSerializer.class)
    private BigDecimal totalmoney;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Timestamp time;

    @Transient
    private List<String> books;

    public int getOrder_id(){
        return order_id;
    }
    public int getUser_id(){
        return user_id;
    }
    public BigDecimal getTotalmoney(){
        return totalmoney;
    }

    public Timestamp getTime(){
        return time;
    }

    public List<String> getBooks(){
        return books;
    }

    public void setOrder_id(int order_id){
        this.order_id = order_id;
    }

    public void setUser_id(int user_id){
        this.user_id = user_id;
    }

    public void setTotalmoney(BigDecimal totalmoney){
        this.totalmoney = totalmoney;
    }

    public void setTime(Timestamp time){
        this.time = time;
    }

    public void setBooks(List<String> books){
        this.books = books;
    }

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<OrderItem> order_itemlist;

    public List<OrderItem> getOrder_itemlist(){
        return order_itemlist;
    }

    public void setOrder_itemlist(List<OrderItem> list){
        this.order_itemlist = list;
    }
}
