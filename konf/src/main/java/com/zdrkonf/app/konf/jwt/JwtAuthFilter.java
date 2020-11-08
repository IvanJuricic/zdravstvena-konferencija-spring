package com.zdrkonf.app.konf.jwt;

import com.zdrkonf.app.konf.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public JwtAuthFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint, UserRepository userRepository) {
        super(authenticationManager, authenticationEntryPoint);
        this.userRepository = userRepository;
    }

    

}
