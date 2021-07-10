package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "cart_item")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "item_id")
public class CartItem {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "item_id")
    private int item_id;

    @Column(name = "book_id")
    private int book_id;

    @Transient
    private String name;

    @Transient
    @JsonSerialize(using= ToStringSerializer.class)
    private BigDecimal price;

    @Transient
    private int status;

    @Transient
    private String img;

    @Transient
    private String description;

    public int getItem_id(){
        return item_id;
    }
    public void setItem_id(int item_id){
        this.item_id = item_id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public BigDecimal getPrice(){
        return price;
    }
    public void setPrice(BigDecimal price){
        this.price = price;
    }
    public int getStatus(){
        return status;
    }
    public void setStatus(int status){
        this.status = status;
    }
    public String getImg(){
        return img;
    }
    public void setImg(String img){
        this.img = img;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public int getBook_id(){
        return book_id;
    }
    public void setBook_id(int book_id){
        this.book_id = book_id;
    }

    @ManyToOne(fetch = FetchType.EAGER,optional=false)
    @JoinColumn(name="cart_id", nullable = false)
    private Cart cart;

    public Cart getCart(){
        return cart;
    }

    public void setCart(Cart cart){
        this.cart = cart;
    }
}
