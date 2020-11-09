package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    public User findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<User> findByUsername(String name);
}
