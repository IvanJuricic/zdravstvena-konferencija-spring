package com.zdrkonf.app.konf.controllers;

import com.zdrkonf.app.konf.EmailService;
import com.zdrkonf.app.konf.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

        stringBuilder.append(verifyURL + "\n");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        emailService.sendMail(email, subject, msg);
    }

    public void sendReviewAcceptanceEmail (List<String> emails) {
        String subject = "Recenzija Vašeg rada!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Vaš rad je prihvaćen.\n");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        for (String email : emails){
            emailService.sendMail(email, subject, msg);
        }

    }

    public void sendReviewAcceptMinorChangesEmail (List<String> emails) {
        String subject = "Recenzija Vašeg rada!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Vaš rad je prihvaćen, ali je potrebno napraviti male izmjene.\n");
        stringBuilder.append("Na Vašem profilu možete vidjeti upute za ispravljanje.\n");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        for (String email : emails){
            emailService.sendMail(email, subject, msg);
        }
    }

    public void sendReviewPendingEmail (List<String> emails) {
        String subject = "Recenzija Vašeg rada!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Vaš rad nije prihvaćen iz razloga koje možete pregledati na Vašem profilu.\n");
        stringBuilder.append("Prepravite Vaš rad prema uputama, nakon čega će opet proći kroz sustav ocjenjivanja.\n");
        stringBuilder.append("Hvala Vam i vidimo se!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        for (String email : emails){
            emailService.sendMail(email, subject, msg);
        }
    }

    public void sendReviewDeclineEmail (List<String> emails) {
        String subject = "Recenzija Vašeg rada!";

        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Poštovani,\n");
        stringBuilder.append("Vaš rad nije prihvaćen iz razloga koje možete pregledati na Vašem profilu.\n");
        stringBuilder.append("Nažalost, nećete dobiti mogućnost ispravka Vašeg rada.\n");
        stringBuilder.append("Hvala Vam i vidimo se iduće godine!\n");
        stringBuilder.append("Lp, zdravstvena konferencija!");

        String msg = stringBuilder.toString();

        for (String email : emails){
            emailService.sendMail(email, subject, msg);
        }
    }


}
