package com.zdravstvenakonf.app.service;

import com.zdravstvenakonf.app.dao.UserDao;
import com.zdravstvenakonf.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao){
        this.userDao = userDao;
    }

    public int addUser(User user){
        return userDao.insertUser(user);
    }
}
