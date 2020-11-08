package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/create")
    public String create(@RequestBody String name, @RequestBody String email, @RequestBody String section){
        User user = userService.create(name, email, section);
        return user.toString();
    }

    @RequestMapping("/get")
    public User getUser(@RequestBody String email){
        return userService.getByEmail(email);
    }

    @RequestMapping("/getAll")
    public List<User> getAll(){
        return userService.getAll();
    }

    @RequestMapping("/update")
    public String update(@RequestBody String name, @RequestBody String email, @RequestBody String section){
        User user = userService.update(name, email, section);
        return user.toString();
    }

    @RequestMapping("/delete")
    public String delete(@RequestBody String email){
        userService.delete(email);
        return "Deleted " + email;
    }

    @RequestMapping("/deleteAll")
    public String deleteAll(){
        userService.deleteAll();
        return "Deleted all records";
    }
}
