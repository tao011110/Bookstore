package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    BookRepository bookRepository;

    @Override
    public Book findBook(Integer id){
        Book bookResult = bookRepository.findBook(id);

        return bookResult;
    }

    @Override
    public List<Book> listBooks() {
        List<Book> listResult = bookRepository.getBooks();

        return listResult;
    }
}
