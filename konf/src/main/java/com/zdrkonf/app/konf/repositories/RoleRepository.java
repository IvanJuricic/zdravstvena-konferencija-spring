package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Role;
import com.zdrkonf.app.konf.models.RoleEnum;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(RoleEnum name);
}
