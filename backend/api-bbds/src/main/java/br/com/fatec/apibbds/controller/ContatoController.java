package br.com.fatec.apibbds.controller;

import br.com.fatec.apibbds.model.Contato;
import br.com.fatec.apibbds.service.ContatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contato")
public class ContatoController {
    private final ContatoService contatoService;
    public ContatoController(ContatoService contatoService){
        this.contatoService=contatoService;
    }
    @GetMapping
    public List<Contato> listar(){
        return this.contatoService.listar();
    }
    @PostMapping
    public ResponseEntity<Contato> salvar(@RequestBody Contato contato){
        contatoService.salvar(contato);
        return ResponseEntity.status(201).body(contato);
    }

}
