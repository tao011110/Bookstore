package com.bookstore_backend.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Carts")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "cart_id")
public class Cart {
    @Id
    @GeneratedValue(generator = "increment")
    @Column(name = "cart_id")
    private int cart_id;

    @Column(name = "user_id")
    private int user_id;

    public int getUser_id(){
        return user_id;
    }
    public void setUser_id(int user_id){
        this.user_id = user_id;
    }
    public int getCart_id(){
        return cart_id;
    }
    public void setCart_id(int cart_id){
        this.cart_id = cart_id;
    }

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<CartItem> cart_itemlist;

    public List<CartItem> getCart_itemlist(){
        return cart_itemlist;
    }

    public void setCart_itemlist(List<CartItem> list){
        this.cart_itemlist = list;
    }
}
