package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Book findBook(Integer id){
        System.out.println(id);
        String sql = "select * from mybookstore.books where id = ?";
        Book bookResult = jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<Book>(Book.class),
                id);
        System.out.println(bookResult.getId() + ": " + bookResult.getName());

        return bookResult;
    }


    @Override
    public List<Book> listBooks() {
        String sql = "select * from mybookstore.books";
        List<Book> listResult = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<Book>(Book.class));
        for(Book book : listResult){
            System.out.println(book.getId() + ": " + book.getName());
        }

        return listResult;
    }
}
