package br.com.fatec.apibbds.controller;

import br.com.fatec.apibbds.model.Admin;
import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gestao")
public class AdminController {
    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public ResponseEntity<?> autenticar(@RequestBody Cliente obj) {
        try {
            return ResponseEntity.ok(this.adminService.autenticar(obj.getCodigo(), obj.getSenha()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

