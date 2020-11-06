package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/create")
    public String create(@RequestParam String name, @RequestParam String email, @RequestParam String section){
        User user = userService.create(name, email, section);
        return user.toString();
    }

    @RequestMapping("/get")
    public User getUser(@RequestParam String email){
        return userService.getByEmail(email);
    }

    @RequestMapping("/getAll")
    public List<User> getAll(){
        return userService.getAll();
    }

    @RequestMapping("/update")
    public String update(@RequestParam String name, @RequestParam String email, @RequestParam String section){
        User user = userService.update(name, email, section);
        return user.toString();
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam String email){
        userService.delete(email);
        return "Deleted " + email;
    }

    @RequestMapping("/deleteAll")
    public String deleteAll(){
        userService.deleteAll();
        return "Deleted all records";
    }
}
