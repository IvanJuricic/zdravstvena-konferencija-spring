package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.EmailService;
import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.EmailRequest;
import com.zdrkonf.app.konf.request.PaperRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/paper")
public class PaperController {

    @Autowired
    PaperRepository paperRepository;

    @Autowired
    EmailController emailController;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/upload/{id}")
    public Paper uploadPaper(@RequestBody PaperRequest paperRequest, @PathVariable("id") String userId){

        List<Review> reviewList = new ArrayList<>();

        Paper newPaper = new Paper(paperRequest.getPaperName(), paperRequest.getPaperURL(), reviewList);

        paperRepository.save(newPaper);

        Optional<User> user = userRepository.findById(userId);

        try{
            user.get().getPapers().add(newPaper.getId());
        } catch (Exception e){
            return newPaper;
        }

        userRepository.save(user.get());

        return newPaper;

    }

    @PostMapping("/email")
    public String sendConfEmail(@RequestBody EmailRequest emailRequest){

        emailController.sendPaperSubmitEmail(emailRequest.getEmail());

        return emailRequest.getEmail();
    }

    @GetMapping("/paper/{id}")
    public Iterable<Paper> getUserPapers(@PathVariable("id") String userId){

        List<String> paperIds = userRepository.findById(userId).get().getPapers();

        Iterable<Paper> papers = paperRepository.findAllById(paperIds);

        return papers;

    }

}
