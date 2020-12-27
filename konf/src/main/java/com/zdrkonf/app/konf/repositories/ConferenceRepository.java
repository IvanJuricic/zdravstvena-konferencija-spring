package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Conference;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConferenceRepository extends MongoRepository<Conference, String> {
    public Conference findByTitle(String title);
}
