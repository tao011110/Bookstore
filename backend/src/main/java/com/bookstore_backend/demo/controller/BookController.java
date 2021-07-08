package com.bookstore_backend.demo.controller;

import com.bookstore_backend.demo.repository.BookRepository;
import com.bookstore_backend.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/listBooks")
    public Page<Book> listBooks(@RequestBody Map<String, String> param){
        List<Book> list = bookService.listBooks();
        for(Book book : list){
            System.out.println(book.getId() + ": " + book.getName());
        }
        String snowPage =  String.valueOf(param.get("page"));
        int nowPage = Integer.valueOf(snowPage);
        Pageable pageable = PageRequest.of(nowPage, 16);
        List<Book> b = bookService.woc(pageable).getContent();
        System.out.println("i.getName()");
        for(Book i : b){
            System.out.println(i.getName());
        }
        System.out.println();
        list = b;
        return bookService.woc(pageable);
    }

    @RequestMapping("/showAllBooks")
    public List<Book> showAllBooks(){
        List<Book> list = bookService.showAllBooks();
        for(Book book : list){
            System.out.println(book.getId() + ": " + book.getName() + " " + book.getISBN());
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
