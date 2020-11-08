package com.zdrkonf.app.konf.services;


import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;


import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return new org.springframework.security.core.userdetails.User("Admin", "Admin123", )
    }

    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private BCryptPasswordEncoder bCryptPasswordEncoder;

    // Create operation
    public User create(String name, String email, String section){
        return userRepository.save(new User(name, email, section));
    }

    // Retreive operation
    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User getByEmail(String email){
        return userRepository.findByEmail(email
        );
    }

    // Update operation
    public User update(String name, String email, String section){
        User user = userRepository.findByEmail(email);
        user.setName(name);
        user.setSection(section);
        return userRepository.save(user);
    }

    // Delete operation
    public void deleteAll(){
        userRepository.deleteAll();
    }

    public void delete(String email){
        User user = userRepository.findByEmail(email);
        userRepository.delete(user);
    }

}
