package com.zdrkonf.app.konf.repositories;

import com.zdrkonf.app.konf.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    Object findAllById(List<Review> reviews);
}
