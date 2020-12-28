package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
