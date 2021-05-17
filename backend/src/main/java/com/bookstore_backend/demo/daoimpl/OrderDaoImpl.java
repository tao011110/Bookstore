package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.OrderDao;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public boolean addOrder(String s1, List<String>sqlList){
        System.out.println("order!!");
        String sql1 = s1;
        System.out.println("sq1  " +sql1);
        try {
            jdbcTemplate.update(sql1);
            for(String sql : sqlList){
                System.out.println(sql);
                jdbcTemplate.update(sql);
            }
            return true;
        }
        catch(Exception e){
            System.out.println("不可重复添加！");
            return false;
        }
    }

    @Override
    public boolean addOrderOne(String s1, String s2){
        System.out.println("order!!");
        String sql1 = s1;
        String sql2 = s2;
        System.out.println("sq1  " +sql1);
        try {
            jdbcTemplate.update(sql1);
            jdbcTemplate.update(sql2);
            return true;
        }
        catch(Exception e){
            System.out.println("不可重复添加！");
            return false;
        }
    }
}
