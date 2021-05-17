package com.bookstore_backend.demo.dao;

import com.bookstore_backend.demo.entity.Book;
import java.util.List;

public interface BookDao {
    Book findBook(Integer id);
    List<Book> listBooks();
}
