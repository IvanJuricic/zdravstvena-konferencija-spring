package com.zdrkonf.app.konf.controllers;


import com.zdrkonf.app.konf.Utility;
import com.zdrkonf.app.konf.models.Role;
import com.zdrkonf.app.konf.models.RoleEnum;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.RoleRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.LoginRequest;
import com.zdrkonf.app.konf.request.SignupRequest;
import com.zdrkonf.app.konf.response.JwtResponse;
import com.zdrkonf.app.konf.response.MessageResponse;
import com.zdrkonf.app.konf.security.jwt.AuthTokenFilter;
import com.zdrkonf.app.konf.security.jwt.JwtUtils;
import com.zdrkonf.app.konf.security.services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    private String plainPassword, password, verificationToken;

    @Autowired
    EmailController emailController;

    @Autowired
    JwtUtils jwtUtils;

    private static String alphaNumericString(int len) {
        String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }

    private boolean verifyUser(String verificationToken){
        User user = userRepository.findByverificationToken(verificationToken);

        if(user == null || user.getIsAuthorized()){
            return false;
        } else {
            user.setIsAuthorized(true);
            userRepository.save(user);
            return true;
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, HttpServletRequest request) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        List<String> papers = new ArrayList<>();


        plainPassword = alphaNumericString(10);

        password = encoder.encode(plainPassword);

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getSection(),
                password,
                papers,
                signUpRequest.getInstitute(),
                false
                );

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        verificationToken = alphaNumericString(15);
        user.setVerificationToken(verificationToken);

        user.setRoles(roles);
        userRepository.save(user);

        String siteURL = Utility.getSiteURL(request);

        emailController.sendAuthConfEmail(signUpRequest.getEmail(), plainPassword, verificationToken, siteURL);

        return ResponseEntity.ok(new MessageResponse("Uspješno ste se prijavili!\nPotvrdite prijavu klikom na link na vašem email-u!"));
    }

    @GetMapping("/verify/{verificationToken}")
    public String verifyAccount(@PathVariable("verificationToken") String verificationToken){

        boolean verified = verifyUser(verificationToken);

        if(verified)
            return "redirect:http://localhost:8081/login";
        else
            return "/signup";
    }
}
