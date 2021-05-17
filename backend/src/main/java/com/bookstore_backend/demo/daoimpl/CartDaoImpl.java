package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.CartDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.CartItem;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<CartItem> listItems(String s){
        String sql = s;
        List<CartItem> listResult = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<CartItem>(CartItem.class));
        for(CartItem item : listResult){
            System.out.println(item.getItem_id() + ": " + item.getDescription());
        }

        return listResult;
    }
    @Override
    public boolean addItem(String s){
        String sql = s;
        try {
            jdbcTemplate.update(sql);
            return true;
        }
        catch(Exception e){
            System.out.println("不可重复添加！");
            return false;
        }
    }
    @Override
    public boolean deleteItem(List<String> sqlList){
        try {
            for(String sql : sqlList) {
               jdbcTemplate.update(sql);
            }
            return true;
        }
        catch(Exception e){
            System.out.println("删除失败！");
            return false;
        }
    }
}
