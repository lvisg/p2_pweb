package br.com.fatec.apibbds.controller;

import br.com.fatec.apibbds.model.Produto;
import br.com.fatec.apibbds.service.ProdutoService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/produto")
public class ProdutoController {
    private final ProdutoService produtoService;
    public ProdutoController(ProdutoService produtoService){
        this.produtoService=produtoService;
    }
    @GetMapping
    public List<Produto> listar(){
        return produtoService.listar();
    }
    @GetMapping("/busca")
    public ResponseEntity<Page<Produto>> buscar(@RequestParam String termo, @RequestParam(defaultValue = "12") int tamanho, @RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(produtoService.buscar(termo, tamanho, page));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Produto> alterar(@RequestBody Produto produto, @PathVariable Integer id){
        return produtoService.alterar(produto, id).
                map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}