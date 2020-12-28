package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PaperRepository extends MongoRepository<Paper, String> {
    public Paper findBypaperName(String paperName);
}
