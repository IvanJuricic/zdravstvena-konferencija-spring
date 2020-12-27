package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.EmailService;
import com.zdrkonf.app.konf.models.Paper;
import com.zdrkonf.app.konf.repositories.PaperRepository;
import com.zdrkonf.app.konf.request.EmailRequest;
import com.zdrkonf.app.konf.request.PaperRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/paper")
public class PaperController {

    @Autowired
    PaperRepository paperRepository;

    @Autowired
    EmailController emailController;

    @PostMapping("/upload")
    public String uploadPaper(@RequestBody PaperRequest paperRequest){

        Paper newPaper = new Paper(paperRequest.getPaperName(), paperRequest.getPaperURL());

        paperRepository.save(newPaper);

        return paperRequest.getPaperName() + paperRequest.getPaperURL();

    }

    @PostMapping("/email")
    public String sendConfEmail(@RequestBody EmailRequest emailRequest){

        emailController.sendPaperSubmitEmail(emailRequest.getEmail());

        return emailRequest.getEmail();
    }

}
