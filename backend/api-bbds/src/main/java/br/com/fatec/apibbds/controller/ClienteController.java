package br.com.fatec.apibbds.controller;

import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.model.Autenticador;
import br.com.fatec.apibbds.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listar() {
        return ResponseEntity.ok(clienteService.listar());
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<Cliente> carregar(@PathVariable String cpf) {
        return clienteService.carregar(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Cliente cliente) {
        System.out.println(cliente.getNome() + cliente.getCodigo());
        try {
            clienteService.salvar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<Cliente> alterar(@PathVariable String cpf, @RequestBody Cliente cliente) {
        return clienteService.alterar(cliente, cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> deletar(@PathVariable String cpf) {
        if (clienteService.carregar(cpf).isPresent()) {
            clienteService.deletar(cpf);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> autenticar(@RequestBody Cliente obj) {
        try {
            return ResponseEntity.ok(this.clienteService.autenticar(obj.getCpf(), obj.getSenha()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/token")
    public ResponseEntity<Boolean> validaToken(@RequestBody String token){
        return ResponseEntity.ok(this.clienteService.validaToken(token));
    }
    @PostMapping("/recupera-senha")
    public ResponseEntity<?> recuperaSenha(@RequestBody Cliente cliente) {
        try {
            this.clienteService.enviaEmailSenha(cliente.getCpf(), cliente.getEmail());
            return ResponseEntity.status(201).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PostMapping("/valida-token")
    public ResponseEntity<Boolean> recuperaSenha(@RequestBody String token) {
       return ResponseEntity.ok(this.clienteService.validaToken(token));
    }
    @PatchMapping
    public ResponseEntity<Cliente> alteraSenha(@RequestBody Cliente cliente){
        return clienteService.trocaSenha(cliente.getCpf(), cliente.getSenha()).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}