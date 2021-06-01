package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore_backend.demo.entity.Book;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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
    public List<Book> showAllBooks() {
        List<Book> listResult = bookRepository.showAllBooks();

        return listResult;
    }

    @Override
    public List<Book> listBooks() {
        List<Book> listResult = bookRepository.getBooks();

        return listResult;
    }

    @Override
    public int updateBook(Map<String, String> param){
        String sid = String.valueOf(param.get("id"));
        int id = Integer.valueOf(sid);
        int result = 0;
        String change = String.valueOf(param.get("change"));
        try {
            if (change.equals("id")) {
                String author = String.valueOf(param.get("author"));
                String name = String.valueOf(param.get("name"));
                result = bookRepository.updateBookID(id, author, name);
            }

            if (change.equals("author")) {
                String author = String.valueOf(param.get("author"));
                result = bookRepository.updateBookAuthor(id, author);
            }

            if (change.equals("type")) {
                String type = String.valueOf(param.get("type"));
                result = bookRepository.updateBookType(id, type);
            }

            if (change.equals("inventory")) {
                String sinventory = String.valueOf(param.get("inventory"));
                int inventory = Integer.valueOf(sinventory);
                bookRepository.updateBookInventory(id, inventory);
            }

            if (change.equals("price")) {
                String sprice = String.valueOf(param.get("price"));
                int price = Integer.valueOf(sprice);
                result = bookRepository.updateBookPrice(id, price);
            }

            if (change.equals("name")) {
                String name = String.valueOf(param.get("name"));
                result = bookRepository.updateBookName(id, name);
            }

            if (change.equals("img")) {
                String img = String.valueOf(param.get("img"));
                result = bookRepository.updateBookImg(id, img);
            }

            if (change.equals("description")) {
                String description = String.valueOf(param.get("description"));
                result = bookRepository.updateBookDescription(id, description);
            }

            if (change.equals("status")) {
                String sstatus = String.valueOf(param.get("status"));
                int status = Integer.valueOf(sstatus);
                result = bookRepository.updateBookStatus(id, status);
            }
        }
        catch (Exception e){
            System.out.println("wrong input");
            return -1;
        }

        return result;
    }
}
