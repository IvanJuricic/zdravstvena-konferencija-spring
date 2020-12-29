package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.ReviewRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/review")
public class ReviewerController {

    @Autowired
    PaperRepository paperRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    EmailController emailController;

    @PostMapping("/addReview/{id}")
    @PreAuthorize("hasRole('REVIEWER')")
    public Paper addReview(@PathVariable("id") String paperID, @RequestBody ReviewRequest reviewRequest){
        Optional<Paper> paper = paperRepository.findById(paperID);

        Review newReview = new Review(reviewRequest.getReviewerId(), reviewRequest.getComment());

        reviewRepository.save(newReview);

        List<String> reviews = paper.get().getReviews();

        reviews.add(newReview.getId());

        paper.get().setReviews(reviews);
        paper.get().setAccepted(reviewRequest.getIsAccepted());

        paperRepository.save(paper.get());

        return paper.get();
    }


}
