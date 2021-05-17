package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.CartDao;
import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartDao cartDao;

    @Override
    public List<CartItem> listItems(int user_id){
        String s = "select * from mybookstore.cart_" + (user_id);
        System.out.println("sql: " + s);
        return cartDao.listItems(s);
    }

    @Override
    public boolean addItem(Map<Object, Object> param){
        String sid =  String.valueOf(param.get("id"));
        int id = Integer.valueOf(sid);
        String sprice=  String.valueOf(param.get("price"));
        int price = Integer.valueOf(sprice);
        String snum =  String.valueOf(param.get("num"));
        int num = Integer.valueOf(snum);
        String suser_id =  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(suser_id);
        String name =  String.valueOf(param.get("name"));
        name = "\"" + name + "\"";
        String img =  String.valueOf(param.get("img"));
        img = "\"" + img + "\"";
        String description =  String.valueOf(param.get("description"));
        description = "\"" + description + "\"";
        int status = 1;

        //System.out.println(id +" " + price +" " + num +" " + user_id);
        String s = "insert into mybookstore.cart_" + String.valueOf(user_id)
                + " values(" + id + ", " + name + ", " + num + ", " + price + ", " + status +
                ", " + img + ", " + description + ");";
        //.out.println("sql: " + s);
        boolean flag = cartDao.addItem(s);
        if(flag == true){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteItem(Map<Object, Object> param){
        String uid =  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(uid);

        System.out.println("ss");

        String sid =  String.valueOf(param.get("id"));
        System.out.println(sid + "  " + sid.length());
        int length = 0;
        for(int i = 0; i < sid.length(); i++){
            if(sid.charAt(i) == ','){
                length++;
            }
        }
        int[] id = new int[length + 1];
        int lastIndex = 0;
        List<String> sqlList = new ArrayList<>();
        for(int j = 0; j < id.length; j++) {
            id[j] = 0;
            for (int i = lastIndex; i < sid.length(); i++) {
                if (sid.charAt(i) == '[') {
                    continue;
                }
                if (sid.charAt(i) <= '9' && sid.charAt(i) >= '0') {
                    id[j] = id[j] * 10 + (sid.charAt(i) - '0');
                    System.out.println(id[j]);
                }
                if (sid.charAt(i) == ',' || sid.charAt(i) == ']') {
                    lastIndex = i + 1;
                    break;
                }
            }
            String s = "delete from mybookstore.cart_" + user_id
                    + " where " + "item_id" + " =" + id[j] + ";";
            sqlList.add(s);
            System.out.println(s);
        }

        boolean flag = cartDao.deleteItem(sqlList);
        if(flag == true){
            return true;
        }
        return false;
    }
}
