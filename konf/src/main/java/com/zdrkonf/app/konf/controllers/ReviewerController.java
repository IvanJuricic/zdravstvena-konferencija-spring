package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.ReviewRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @Autowired
    UserRepository userRepository;

    @PostMapping("/addReview/{id}")
    @PreAuthorize("hasRole('REVIEWER')")
    public List<String> addReview(@PathVariable("id") String paperID, @RequestBody ReviewRequest reviewRequest){
        Optional<Paper> paper = paperRepository.findById(paperID);

        Review newReview = new Review(reviewRequest.getReviewerId(), reviewRequest.getComment());

        reviewRepository.save(newReview);

        List<String> reviews = paper.get().getReviews();

        reviews.add(newReview.getId());

        paper.get().setReviews(reviews);
        paper.get().setStatus(reviewRequest.getStatus());

        paperRepository.save(paper.get());
        List<User> userList = reviewRequest.getUsers();
        List<String> emailList = new ArrayList<>();
        for (User user: userList){
            try {
                int len = user.getPapers().size();
                for(int i = 0; i<len; i++){
                    if(user.getPapers().get(i).contains(paperID)){
                        emailList.add(user.getEmail());
                        break;
                    }
                }
            } catch (Exception e) {
                continue;
            }

        }

        /*
        if(reviewRequest.getStatus().contains("accept")){
            emailController.sendReviewAcceptanceEmail(emailList);
        } else if(reviewRequest.getStatus().contains("acceptMinorChanges")) {
            emailController.sendReviewAcceptMinorChangesEmail(emailList);
        } else if(reviewRequest.getStatus().contains("pending")) {
            emailController.sendReviewPendingEmail(emailList);
        } else if(reviewRequest.getStatus().contains("decline"))
            emailController.sendReviewDeclineEmail(emailList);
*/
        return emailList;
    }


}
