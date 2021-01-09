package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.EmailService;
import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.models.Review;
import com.zdrkonf.app.konf.models.User;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.repositories.UserRepository;
import com.zdrkonf.app.konf.request.EmailRequest;
import com.zdrkonf.app.konf.request.PaperRequest;
import com.zdrkonf.app.konf.response.PaperResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity uploadPaper(@RequestBody PaperRequest paperRequest, @PathVariable("id") String userId){

        List<String> reviewList = new ArrayList<>();

        Paper newPaper = new Paper(paperRequest.getPaperName(), paperRequest.getPaperURL(), reviewList, "No review");

        Paper paper = paperRepository.findBypaperName(paperRequest.getPaperName());

        Optional<User> user = userRepository.findById(userId);
        newPaper.setSection(user.get().getSection());

        if(paper == null){
            paperRepository.save(newPaper);
            try{
                user.get().getPapers().add(newPaper.getId());
            } catch (Exception e){
                return ResponseEntity.ok(new PaperResponse(newPaper, "Something Went Wrong"));
            }
            userRepository.save(user.get());
            return ResponseEntity.ok(new PaperResponse(newPaper, "Dodan novi rad"));
        } else {
            paper.setUrl(paperRequest.getPaperURL());
            paper.setTitle(paperRequest.getPaperName());
            paperRepository.save(paper);
            return ResponseEntity.ok(new PaperResponse(paper, "Rad ažuriran!"));
        }
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
