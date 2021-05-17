package com.bookstore_backend.demo.entity;

public class CartItem {
    private int item_id;
    private String name;
    private int num;
    private int price;
    private int status;
    private String img;
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
    public int getPrice(){
        return price;
    }
    public void setPrice(int price){
        this.price = price;
    }
    public int getNum(){
        return num;
    }
    public void setNum(int num){
        this.num = num;
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
}
