package com.zdravstvenakonf.app.dao;

import com.zdravstvenakonf.app.model.User;

import java.util.UUID;

public interface UserDao {
    int insertUser(UUID id, User user);

    default int insertUser(User user){
        UUID id = UUID.randomUUID();
        return insertUser(id, user);
    }
}
