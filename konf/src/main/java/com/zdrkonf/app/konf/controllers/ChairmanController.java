package com.zdrkonf.app.konf.controllers;


import com.zdrkonf.app.konf.models.*;
import com.zdrkonf.app.konf.repositories.ConferenceRepository;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.RoleRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.ConferenceDetailsRequest;
import com.zdrkonf.app.konf.request.EditUserRequest;
import com.zdrkonf.app.konf.request.SetRoleRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chairman")
public class ChairmanController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PaperRepository paperRepository;

    @GetMapping("/getPapers")
    @PreAuthorize("hasRole('CHAIRMAN') or hasRole('REVIEWER') or hasRole('ADMIN') or hasRole('USER')")
    public List<Paper> getPapersLength(){

        return paperRepository.findAll();
    }


    @PostMapping("/setRole")
    @PreAuthorize("hasRole('CHAIRMAN')")
    public String setUserRole(@RequestBody SetRoleRequest setRoleRequest){

        User user = userRepository.findByUsername(setRoleRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + setRoleRequest.getUsername()));

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(RoleEnum.ROLE_REVIEWER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        roles = user.getRoles();
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return user.getRoles().toString();

    }

    @PostMapping("/editUser/{id}")
    @PreAuthorize("hasRole('CHAIRMAN')")
    public User editUserDate(@PathVariable("id") String userId, @RequestBody EditUserRequest editUserRequest){

        Optional<User> user = userRepository.findById(userId);

        user.get().setUsername(editUserRequest.getUsername());

        userRepository.save(user.get());

        return user.get();

    }



}
