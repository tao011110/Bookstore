package com.bookstore_backend.demo.daoimpl;

import com.bookstore_backend.demo.dao.UserDao;
import com.bookstore_backend.demo.entity.Order;
import com.bookstore_backend.demo.entity.OrderItem;
import com.bookstore_backend.demo.entity.User;
import com.bookstore_backend.demo.repository.OrderRepository;
import com.bookstore_backend.demo.repository.UserRepository;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;

    @Override
    public User check(String username, String password){
        try {
            User userResult = userRepository.checkUser(username, password);
            System.out.println("登陆成功!");

            return userResult;
        }
        catch (Exception e) {
            System.out.println("登陆失败!");

            return null;
        }
    }

    @Override
    public int register(@RequestBody Map<String,String> param){
        try {
            String username = param.get("username");
            String password = param.get("password");
            String password2 = param.get("password2");
            String email = param.get("email");
            System.out.println("username " + username + " , password " + password);
            System.out.println("password2 " + password2 + " , email " + email);
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setUserType(1);
            user.setEmail(email);
            userRepository.save(user);
            int user_id = userRepository.getUserIdbyUsername(username);
            return user_id;
        }
        catch (Exception e){
            return -1;
        }
    }

    @Override
    public List<User> listUsers(){
        List<User> listResult = userRepository.listUsers();

        return listResult;
    }

    @Override
    public int updateUserType(Map<String, String> param) {
        System.out.println("modify user type");
        String sid = String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(sid);
        System.out.println("user_id  "+ user_id);
        String stype = String.valueOf(param.get("user_type"));
        int user_type = Integer.valueOf(stype);
        System.out.println("user_type  "+ user_type);

        return userRepository.updateUserType(user_id, user_type);
    }

    @Override
    public int checkUserType(Map<String, String> param) {
        System.out.println("modify user type");
        String sid = String.valueOf(param.get("user_id"));
        int user_id = Integer.valueOf(sid);
        System.out.println("user_id  "+ user_id);

        return userRepository.checkUserType(user_id);
    }

    @Override
    public List<User> getTopUser(Map<String, String> param){
        String sminDate =  String.valueOf(param.get("minDate"));
        String smaxDate =  String.valueOf(param.get("maxDate"));
        System.out.println("sminDate smaxDate");
        System.out.println(sminDate + "  " + smaxDate);
        Timestamp minDate = Timestamp.valueOf(sminDate);
        Timestamp maxDate = Timestamp.valueOf(smaxDate);
        System.out.println(minDate + "  " + maxDate);
        List<Order> l = orderRepository.getOrdersByTime(minDate, maxDate);

        List<User> users = new LinkedList<>();
        for(int i = 0; i < l.size(); i++){
            boolean flag = false;
            int user_id = l.get(i).getUser_id();
            for(int j = 0; j < users.size(); j++){
                if(users.get(j).getUser_id() == user_id){
                    flag = true;
                    BigDecimal money = users.get(j).getTotalMoney().add(l.get(i).getTotalmoney());
                    users.get(j).setTotalMoney(money);
                    break;
                }
            }
            if(flag == false){
                User newUser = new User();
                newUser.setTotalMoney(l.get(i).getTotalmoney());
                newUser.setUser_id(user_id);
                newUser.setUsername(userRepository.getUserByUserId(user_id).getUsername());
                users.add(newUser);
            }
        }
        for(int i=0; i < users.size() - 1; i++)
        {
            for(int j=0;j < users.size()- i - 1; j++)
            {
                if(users.get(j).getTotalMoney().compareTo(users.get(j + 1).getTotalMoney()) == -1)
                {
                    User temp = users.get(j);
                    users.set(j, users.get(j + 1));
                    users.set(j + 1, temp);
                }
            }
        }

        List<User> allUsers = userRepository.listUsers();
        int length = users.size();
        for(User user : allUsers){
            int user_id = user.getUser_id();
            boolean flag = false;
            int i = 0;
            for(i = 0; i < length; i++){
                if(users.get(i).getUser_id() == user_id){
                    flag = true;
                    break;
                }
            }
            if(flag == false && user.getUserType() != 0){
                BigDecimal total = new BigDecimal(0);
                user.setTotalMoney(total);
                users.add(user);
            }
        }

        return users;
    }

    @Override
    public boolean findNameDup(Map<String,String> param){
        String username =  String.valueOf(param.get("username"));
        User result = userRepository.findNameDup(username);
        if(result == null){
            return false;
        }
        return true;
    }
}
