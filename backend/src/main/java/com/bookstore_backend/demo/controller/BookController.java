package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bookstore_backend.demo.entity.Book;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/listBooks")
    public List<Book> listBooks(@RequestBody Map<String, String> param){
        List<Book> list = bookService.listBooks();
        for(Book book : list){
            System.out.println(book.getId() + ": " + book.getName());
        }
        return list;
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        return bookService.findBookById(id);
    }

    @RequestMapping("/updateBook")
    public int updateBook(@RequestBody Map<String, String> param){
        return bookService.updateBook(param);
    }
}
