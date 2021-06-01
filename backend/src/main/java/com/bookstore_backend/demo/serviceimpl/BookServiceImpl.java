package com.bookstore_backend.demo.serviceimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id){
        return bookDao.findBook(id);
    }

    @Override
    public List<Book> listBooks() {
        return bookDao.listBooks();
    }

    @Override
    public List<Book> showAllBooks() {
        return bookDao.showAllBooks();
    }

    @Override
    public int updateBook(Map<String, String> param){
        return bookDao.updateBook(param);
    }
}
