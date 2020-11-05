package com.zdravstvenakonf.app.api;

import com.zdravstvenakonf.app.model.User;
import com.zdravstvenakonf.app.service.UserService;

public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    public void addUser(User user){
        userService.addUser(user);
    }
}
