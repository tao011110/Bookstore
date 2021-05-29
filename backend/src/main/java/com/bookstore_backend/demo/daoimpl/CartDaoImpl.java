package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.CartDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Cart;
import com.bookstore_backend.demo.entity.CartItem;
import com.bookstore_backend.demo.entity.CartItemDelete;
import com.bookstore_backend.demo.repository.BookRepository;
import com.bookstore_backend.demo.repository.CartItemRepository;
import com.bookstore_backend.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    BookRepository bookRepository;

    //    @Override
//    public List<CartItemDelete> listItems(String s){
//        String sql = s;
//        List<CartItemDelete> listResult = jdbcTemplate.query(sql,
//                new BeanPropertyRowMapper<CartItemDelete>(CartItemDelete.class));
//        for(CartItemDelete item : listResult){
//            System.out.println(item.getItem_id() + ": " + item.getDescription());
//        }
//
//        return listResult;
//    }
    @Override
    public List<CartItem> listItems(int user_id){
        Cart userCart = cartRepository.getCartByUser_id(user_id);
        System.out.println("user_id"+user_id);
        if(userCart == null){
            System.out.println("null");
        }
        int cart_id = userCart.getCart_id();
        List<CartItem> listResult = cartItemRepository.getCartItemByCart_id(cart_id);
        for(CartItem item : listResult){
            Book book = bookRepository.findBook(item.getBook_id());
            item.setName(book.getName());
            item.setPrice(book.getPrice());
            item.setImg(book.getImg());
            item.setDescription(book.getDescription());
            item.setStatus(book.getStatus());
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
