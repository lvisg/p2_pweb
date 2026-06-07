package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Autenticador;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class FerramentaService {
    private Autenticador token = new Autenticador();
    private final JavaMailSender smtp;
    public FerramentaService(JavaMailSender smtp){
        this.smtp=smtp;
    }
    public boolean enviarEmail(String para, String assunto, String corpo) {
        try {
            MimeMessage email = smtp.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(email, true, "UTF-8");
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(corpo, true);
            smtp.send(email);
            return true;
        } catch (Exception err) {
            err.printStackTrace();
            return false;
        }
    }
    public String geraToken(){
        token.setToken(String.format("%04d", new Random().nextInt(9999)));
        token.setUsado(false);
        return token.getToken();
    }
    public boolean validaToken(String token){
        if(this.token.getToken().equals(token) && !this.token.isUsado()){
            return true;
        }else{
            return false;
        }
    }
}
