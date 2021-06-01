package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.Book;
import java.util.List;
import java.util.Map;

public interface BookDao {
    Book findBook(Integer id);
    List<Book> listBooks();
    List<Book> showAllBooks();
    int updateBook(Map<String, String> param);
    boolean manageAddBook(Map<Object, Object> param);
}
