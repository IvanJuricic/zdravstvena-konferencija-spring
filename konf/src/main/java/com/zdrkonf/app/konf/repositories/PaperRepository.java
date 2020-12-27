package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Paper;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaperRepository extends MongoRepository<Paper, String> {
}
