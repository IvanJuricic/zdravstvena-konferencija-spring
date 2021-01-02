package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.ConferenceRepository;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.ReviewRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PaperRepository paperRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @GetMapping("/all")
    public ResponseEntity<?> allAccess(){
        return ResponseEntity.ok(conferenceRepository.findAll());
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public Optional<User> userData(@PathVariable String id){

        return userRepository.findById(id);

    }

    @GetMapping("/paper/{id}")
    public Optional<Paper> getPaperData(@PathVariable("id") String paperId){
        return paperRepository.findById(paperId);
    }

    @GetMapping("/review/{id}")
    public List<Review> getPaperReviews(@PathVariable("id") String paperId){

        Paper paper = paperRepository.findById(paperId).get();

        Iterable<String> reviews = paper.getReviews();
        reviewRepository.findAllById(reviews);

        return (List<Review>) reviewRepository.findAllById(reviews);
    }
/*
    @PostMapping("/addAuthor")
    @PreAuthorize("hasRole('USER')")
    public String addAuthor(@RequestBody AuthorRequest authorRequest){

        Optional<Paper> paper = paperRepository.findById(authorRequest.getPaperId());

        paper.get().getTitle();

    }*/

    
}
