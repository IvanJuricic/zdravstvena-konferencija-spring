package com.zdrkonf.app.konf.controllers;


import com.zdrkonf.app.konf.models.Conference;
import com.zdrkonf.app.konf.models.Role;
import com.zdrkonf.app.konf.models.RoleEnum;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.ConferenceRepository;
import com.zdrkonf.app.konf.repositories.RoleRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.ConferenceDetailsRequest;
import com.zdrkonf.app.konf.request.SetRoleRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping("/conf")
    @PreAuthorize("hasRole('ADMIN')")
    public void addConferenceDetails(@RequestBody ConferenceDetailsRequest conferenceDetailsRequest){

        Conference newConference = new Conference(conferenceDetailsRequest.getTitle(),
                conferenceDetailsRequest.getDescription());

        conferenceRepository.save(newConference);
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/setRole")
    @PreAuthorize("hasRole('ADMIN')")
    public String setUserRole(@RequestBody SetRoleRequest setRoleRequest){

        User user = userRepository.findByUsername(setRoleRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + setRoleRequest.getUsername()));

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(RoleEnum.ROLE_CHAIRMAN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        roles = user.getRoles();
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return user.getRoles().toString();

    }



}
