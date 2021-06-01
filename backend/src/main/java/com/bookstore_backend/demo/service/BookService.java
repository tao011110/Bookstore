package com.bookstore_backend.demo.service;
import com.bookstore_backend.demo.entity.Book;

import java.util.List;
import java.util.Map;

public interface BookService {
    Book findBookById(Integer id);
    List<Book> listBooks();
    List<Book> showAllBooks();
    int updateBook(Map<String, String> param);
}
