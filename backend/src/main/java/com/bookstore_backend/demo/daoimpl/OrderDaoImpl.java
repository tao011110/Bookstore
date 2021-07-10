package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.BookDao;
import com.bookstore_backend.demo.dao.OrderDao;
import com.bookstore_backend.demo.entity.Book;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import com.bookstore_backend.demo.repository.BookRepository;
import com.bookstore_backend.demo.repository.OrderItemRepository;
import com.bookstore_backend.demo.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    BookDao bookDao;

    @Autowired
    BookRepository bookRepository;

    @Override
    public boolean addOrder(Map<Object, Object> param){
        try {
            String suser_id = String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(suser_id);
            String stotalmoney = String.valueOf(param.get("totalmoney"));
            BigDecimal totalmoney = new BigDecimal(stotalmoney);
            String sbooks = String.valueOf((param.get("books")));
            System.out.println("sbooks");
            System.out.println(sbooks);
            List<Integer> book_ids = new ArrayList<>();
            List<BigDecimal> prices = new ArrayList<>();
            List<Integer> nums = new ArrayList<>();
            String str1[] = sbooks.split("},");
            System.out.println(str1[0]);
            for (String s : str1) {
                String str2[] = s.split(", ");
                for (String ss : str2) {
                    if (ss.charAt(0) == 'n' && ss.charAt(1) == 'u') {
                        System.out.println(ss);
                        int num = 0;
                        for (int i = 4; i < ss.length(); i++) {
                            if(ss.charAt(i) == '}'){
                                break;
                            }
                            System.out.println("ss.charAt(i) " + ss.charAt(i));
                            num = num * 10 + ss.charAt(i) - '0';
                        }
                        nums.add(num);
                        continue;
                    }
                    if (ss.charAt(0) == 'p') {
                        System.out.println("sadawda  ");
                        String sprice = ss.substring(6, ss.length());
                        System.out.println("sadawda  "+sprice);
//                        for (int i = 6; i < ss.length(); i++) {
//                            price = price * 10 + ss.charAt(i) - '0';
//                        }
                        BigDecimal price = new BigDecimal(sprice);
                        prices.add(price);
                        continue;
                    }
                    if (ss.charAt(0) == 'b') {
                        int id = 0;
                        for (int i = 8; i < ss.length(); i++) {
                            id = id * 10 + ss.charAt(i) - '0';
                        }
                        book_ids.add(id);
                    }
                }
            }
            System.out.println(book_ids);
            System.out.println(prices);
            System.out.println(nums);


            long time = Calendar.getInstance().getTimeInMillis();
            java.sql.Timestamp ts = new java.sql.Timestamp(time);
            System.out.println("create order at:" + ts.toString());

            Order newOrder = new Order();
            newOrder.setTotalmoney(totalmoney);
            newOrder.setUser_id(user_id);
            newOrder.setTime(ts);
            Order result = orderRepository.save(newOrder);
            System.out.println("\nfinish into orders\n");
            List<OrderItem> items = new ArrayList<>();

            for (int i = 0; i < book_ids.size(); i++) {
                OrderItem newOrderItem = new OrderItem();
                newOrderItem.setOrder(result);
                newOrderItem.setTime(ts);
                newOrderItem.setPrice(prices.get(i));
                newOrderItem.setBook_id(book_ids.get(i));
                newOrderItem.setNum(nums.get(i));
                orderItemRepository.save(newOrderItem);
                System.out.println(bookDao.findBook(book_ids.get(i)).getInventory() - nums.get(i));
                System.out.println(book_ids.get(i));
                bookRepository.updateBookInventory(book_ids.get(i), bookDao.findBook(book_ids.get(i)).getInventory() - nums.get(i));
                items.add(newOrderItem);
            }
            result.setOrder_itemlist(items);

            System.out.println("\nfinish into order_item\n");
        }
        catch(Exception e){
            System.out.println("不可重复添加！");
            return false;
        }
        return true;
    }

    @Override
    public boolean addOrderOne(Map<Object, Object> param){
        try {
            String suser_id=  String.valueOf(param.get("user_id"));
            int user_id = Integer.valueOf(suser_id);
            String stotalmoney =  String.valueOf(param.get("totalmoney"));
            BigDecimal totalmoney = new BigDecimal(stotalmoney);
            String sbook_id = String.valueOf((param.get("book_id")));
            System.out.println(sbook_id);
            int book_id = Integer.valueOf(sbook_id);
            String snum = String.valueOf((param.get("num")));
            int num = Integer.valueOf(snum);


            long time = Calendar.getInstance().getTimeInMillis();
            java.sql.Timestamp ts = new java.sql.Timestamp(time);
            System.out.println("create order at:"+ts.toString());
            System.out.println(ts);

            Order newOrder = new Order();
            newOrder.setTotalmoney(totalmoney);
            newOrder.setUser_id(user_id);
            newOrder.setTime(ts);
            System.out.println("create order?:"+newOrder.getTime());
            Order result = orderRepository.save(newOrder);

            System.out.println("\nfinish into orders\n");
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.setOrder(result);
            newOrderItem.setTime(ts);
            newOrderItem.setPrice(totalmoney);
            newOrderItem.setBook_id(book_id);
            newOrderItem.setNum(num);
            orderItemRepository.save(newOrderItem);
            System.out.println("\nfinish into order_item\n");
            bookRepository.updateBookInventory(book_id, bookDao.findBook(book_id).getInventory() - 1);
            List<OrderItem> items=new ArrayList<>();
            items.add(newOrderItem);
            result.setOrder_itemlist(items);

            return true;
        }
        catch(Exception e){
            System.out.println("不可重复添加！");

            return false;
        }
    }

    @Override
    public List<Order> showAllOrders() {
        List<Order> listResult = orderRepository.showAllOrders();
        for(Order i : listResult){
            int order_id = i.getOrder_id();
            List<OrderItem> items = orderItemRepository.findOrderItems(order_id);
            i.setOrder_itemlist(items);
            List<String> names = new ArrayList<>();
            for(OrderItem o : items){
                String bookName = bookDao.findBook(o.getBook_id()).getName();
                System.out.println(bookName);
                names.add(bookName);
            }
            i.setBooks(names);
            System.out.println(names);
            System.out.println(i.getTotalmoney());
        }

        return listResult;
    }

    @Override
    public List<Order> showOneOrder(Map<Object, Object> param) {
        String suser_id=  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(suser_id);
        List<Order> listResult = orderRepository.showOneOrder(user_id);
        for(Order i : listResult){
            int order_id = i.getOrder_id();
            List<OrderItem> items = orderItemRepository.findOrderItems(order_id);
            List<String> names = new ArrayList<>();
            for(OrderItem o : items){
                String bookName = bookDao.findBook(o.getBook_id()).getName();
                System.out.println(bookName);
                names.add(bookName);
            }
            i.setBooks(names);
            System.out.println(i.getTotalmoney() +  "   " + i.getTime());
        }

        return listResult;
    }


    @Override
    public Order findOrder(Integer id){
        Order orderResult = orderRepository.findOrder(id);

        return orderResult;
    }



    @Override
    public List<OrderItem> findOrderItems(Integer id){
        System.out.println("id"+id);
        List<OrderItem> orderItemsResult= orderItemRepository.findOrderItems(id);
        System.out.println("orderItemsResult.get(0)");
        System.out.println(orderItemsResult.get(0));
        System.out.println(orderItemsResult.get(0).getPrice());
        for(OrderItem item : orderItemsResult){
            item.setName(bookRepository.findBook(item.getBook_id()).getName());
            System.out.println(item.getName());
        }

        return orderItemsResult;
    }

    @Override
    public List<OrderItem> findOrderItemsByTime(@RequestBody Map<Object, Object> param){
        System.out.println("administrator");
        String sminDate =  String.valueOf(param.get("minDate"));
        System.out.println(sminDate);
        String smaxDate =  String.valueOf(param.get("maxDate"));
        System.out.println(smaxDate);
        Timestamp minDate = Timestamp.valueOf(sminDate);
        Timestamp maxDate = Timestamp.valueOf(smaxDate);
        System.out.println(maxDate + "  " + minDate);
        List<OrderItem> numOrder = orderItemRepository.findOrderItemsByTime(minDate, maxDate);
        List<OrderItem> result = new LinkedList<>();
        List<Integer> book_ids = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();

        for(OrderItem l : numOrder){
            int book_id = l.getBook_id();
            int num = l.getNum();
            boolean flag = false;
            for(int i = 0; i < book_ids.size(); i++){
                if(book_ids.get(i) == book_id){
                    int newNum = nums.get(i)+num;
                    nums.set(i, newNum);
                    flag = true;
                    break;
                }
            }
            if(flag == false){
                nums.add(num);
                book_ids.add(book_id);
            }
        }

        for(int i = 0; i < book_ids.size(); i++){
            OrderItem o = new OrderItem();
            Book book = bookDao.findBook(book_ids.get(i));
            String name = book.getName();
            o.setName(name);
            o.setPrice(book.getPrice());
            o.setNum(nums.get(i));
            System.out.println(o.getName() +" "+o.getPrice() +" " +o.getNum());
            result.add(o);
        }

        for(int i=0; i < result.size() - 1; i++)
        {
            for(int j=0;j < result.size()- i - 1; j++)
            {
                if(result.get(j).getNum() < result.get(j + 1).getNum())
                {
                    OrderItem temp = result.get(j);
                    result.set(j, result.get(j + 1));
                    result.set(j + 1, temp);
                }
            }
        }

        return result;
    }

    @Override
    public List<OrderItem> userFindOrderItemsByTime(@RequestBody Map<Object, Object> param){
        String sminDate =  String.valueOf(param.get("minDate"));
        System.out.println(sminDate);
        String smaxDate =  String.valueOf(param.get("maxDate"));
        System.out.println(smaxDate);
        String suser_id=  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(suser_id);
        Timestamp minDate = Timestamp.valueOf(sminDate);
        Timestamp maxDate = Timestamp.valueOf(smaxDate);
        System.out.println(maxDate + "  " + minDate +"  " + user_id);
        List<OrderItem> numOrder = orderItemRepository.userFindOrderItemsByTime(minDate, maxDate, user_id);
        List<OrderItem> result = new LinkedList<>();
        List<Integer> book_ids = new ArrayList<>();
        List<Integer> nums = new ArrayList<>();

        for(OrderItem l : numOrder){
            int book_id = l.getBook_id();
            int num = l.getNum();
            boolean flag = false;
            for(int i = 0; i < book_ids.size(); i++){
                if(book_ids.get(i) == book_id){
                    int newNum = nums.get(i)+num;
                    nums.set(i, newNum);
                    flag = true;
                    break;
                }
            }
            if(flag == false){
                nums.add(num);
                book_ids.add(book_id);
            }
        }

        for(int i = 0; i < book_ids.size(); i++){
            OrderItem o = new OrderItem();
            Book book = bookDao.findBook(book_ids.get(i));
            String name = book.getName();
            o.setName(name);
            o.setPrice(book.getPrice());
            o.setNum(nums.get(i));
            System.out.println(o.getName() +" "+o.getPrice() +" " +o.getNum());
            result.add(o);
        }

        for(int i=0; i < result.size() - 1; i++)
        {
            for(int j=0;j < result.size()- i - 1; j++)
            {
                if(result.get(j).getNum() < result.get(j + 1).getNum())
                {
                    OrderItem temp = result.get(j);
                    result.set(j, result.get(j + 1));
                    result.set(j + 1, temp);
                }
            }
        }

        return result;
    }

    @Override
    public List<Order> findOrderByTime(@RequestBody Map<Object, Object> param){
        System.out.println("administrator");
        String sminDate =  String.valueOf(param.get("minDate"));
        System.out.println(sminDate);
        String smaxDate =  String.valueOf(param.get("maxDate"));
        System.out.println(smaxDate);
        Timestamp minDate = Timestamp.valueOf(sminDate);
        Timestamp maxDate = Timestamp.valueOf(smaxDate);
        System.out.println(maxDate + "  " + minDate);
        List<Order> result = orderRepository.getOrdersByTime(minDate, maxDate);
        for(Order i : result){
            int order_id = i.getOrder_id();
            List<OrderItem> items = orderItemRepository.findOrderItems(order_id);
            List<String> names = new ArrayList<>();
            for(OrderItem o : items){
                String bookName = "《"+bookDao.findBook(o.getBook_id()).getName() +"》";
                System.out.println(bookName);
                names.add(bookName);
            }
            i.setBooks(names);
            System.out.println(i.getTotalmoney() +  "   " + i.getTime());
        }

        return result;
    }

    @Override
    public List<Order> userFindOrderByTime(@RequestBody Map<Object, Object> param){
        String sminDate =  String.valueOf(param.get("minDate"));
        System.out.println(sminDate);
        String smaxDate =  String.valueOf(param.get("maxDate"));
        System.out.println(smaxDate);
        String suser_id=  String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(suser_id);
        Timestamp minDate = Timestamp.valueOf(sminDate);
        Timestamp maxDate = Timestamp.valueOf(smaxDate);
        System.out.println(maxDate + "  " + minDate +"  " + user_id);

        List<Order> result = orderRepository.userGetOrdersByTime(minDate, maxDate, user_id);
        for(Order i : result){
            int order_id = i.getOrder_id();
            List<OrderItem> items = orderItemRepository.findOrderItems(order_id);
            List<String> names = new ArrayList<>();
            for(OrderItem o : items){
                String bookName = "《"+bookDao.findBook(o.getBook_id()).getName() +"》";
                System.out.println(bookName);
                names.add(bookName);
            }
            i.setBooks(names);
            System.out.println(i.getTotalmoney() +  "   " + i.getTime());
        }

        return result;
    }
}
