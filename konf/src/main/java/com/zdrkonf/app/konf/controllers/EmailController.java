package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.EmailService;
import com.zdrkonf.app.konf.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    public void sendPaperSubmitEmail(String email){

        String subject = "Predan znanstveni rad!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Uspješno ste predali znanstveni rad.\n");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        emailService.sendMail(email, subject, msg);
    }

    public void sendAuthConfEmail(String email, String password, String verificationToken, String siteURL){
        String subject = "Potvrda registracije!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Lozinka za pristup web stranici je ");
        stringBuilder.append(password + "\n");
        stringBuilder.append("Da biste završili registraciju kliknite na ovaj link.\n");

        String verifyURL = siteURL + "/api/auth/verify/" + verificationToken;

        stringBuilder.append("<h3><a =\"href=" + verifyURL + "\">Registriraj me</a></h3>");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        emailService.sendMail(email, subject, msg);
    }
}
