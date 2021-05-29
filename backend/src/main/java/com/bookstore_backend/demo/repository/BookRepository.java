package com.bookstore_backend.demo.repository;

import com.bookstore_backend.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Integer> {
    @Query("from Book where id = :id")
    Book findBook(Integer id);

    @Query("select b from Book b")
    List<Book> getBooks();
}
