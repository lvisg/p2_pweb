package br.com.fatec.apibbds.controller;

import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.model.Pedido;
import br.com.fatec.apibbds.repository.ClienteRepository;
import br.com.fatec.apibbds.service.ClienteService;
import br.com.fatec.apibbds.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pedido")
public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService){
        this.pedidoService= pedidoService;
    }
    @GetMapping
    public List<Pedido> listar(){
        return pedidoService.listar();
    }
    @PostMapping("/cliente")
    public List<Pedido> listarPorCliente(@RequestBody Cliente cliente){
        return pedidoService.listarPorCliente(cliente);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> carregar(@PathVariable Integer codigo){
        return pedidoService.carregar(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Pedido> realizaPedido(@RequestBody Pedido pedido){
        pedidoService.gravar(pedido);
        return ResponseEntity.status(201).body(pedido);
    }

}
