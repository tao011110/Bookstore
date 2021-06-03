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

    @RequestMapping("/showAllBooks")
    public List<Book> showAllBooks(@RequestBody Map<String, String> param){
        List<Book> list = bookService.showAllBooks();
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

    @RequestMapping("/manageAddBook")
    public boolean manageAddBook(@RequestBody Map<Object, Object> param){
        boolean flag =  bookService.manageAddBook(param);
        if(flag == true){
            return true;
        }
        System.out.println("book_id不可重复！");
        return false;
    }

    @RequestMapping("/manageDeleteBook")
    public boolean manageDeleteBook(@RequestBody Map<Object, Object> param){
        boolean flag =  bookService.manageDeleteBook(param);
        if(flag == true){
            return true;
        }
        System.out.println("已删除！");
        return false;
    }
}
