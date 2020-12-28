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

    /*
    @PostMapping("/addReview/{id}")
    @PreAuthorize("hasRole('REVIEWER')")
    public String addReview(@PathVariable("id") String paperID, @RequestBody ReviewRequest reviewRequest){
        Optional<Paper> paper = paperRepository.findById(paperID);

        Review newReview = new Review(reviewRequest.getComment(), reviewRequest.getGrade(), reviewRequest.isAccepted());
        List<Review> reviews = paper.get().getReviews();
        reviews.add(newReview);

        if(!reviewRequest.isAccepted()){
            emailController.sendPaperSubmitEmail(emailRequest.getEmail());
        }


    }*/


}
