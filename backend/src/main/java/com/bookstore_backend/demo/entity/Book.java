package com.bookstore_backend.demo.entity;

public class Book {
    private String name;
    private String author;
    private String type;
    private int inventory;
    private String price;
    private int id;
    private String img;
    private String description;

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setAuthor(String author){
        this.author = author;
    }
    public String getAuthor(){
        return author;
    }
    public void setType(String type){
        this.type = type;
    }
    public String getType(){
        return type;
    }
    public void setInventory(int inventory){
        this.inventory = inventory;
    }
    public int getInventory(){
        return inventory;
    }
    public void setPrice(String price){
        this.price = price;
    }
    public String getPrice(){
        return price;
    }
    public void setID(int id){
        this.id = id;
    }
    public int getId(){
        return id;
    }
    public void setImg(String img){
        this.img = img;
    }
    public String getImg(){
        return img;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return description;
    }
}
