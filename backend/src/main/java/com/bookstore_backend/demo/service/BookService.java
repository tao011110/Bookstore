package com.bookstore_backend.demo.service;
import com.bookstore_backend.demo.entity.Book;

import java.util.List;

public interface BookService {
    Book findBookById(Integer id);
    List<Book> listBooks();
}
