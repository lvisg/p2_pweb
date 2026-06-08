package br.com.fatec.apibbds.service;

import br.com.fatec.apibbds.model.Cliente;
import br.com.fatec.apibbds.model.Pedido;
import br.com.fatec.apibbds.repository.ClienteRepository;
import br.com.fatec.apibbds.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    private final ClienteService clienteService;
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    public PedidoService(ClienteRepository clienteRepository, PedidoRepository pedidoRepository, ClienteService clienteService){
        this.pedidoRepository=pedidoRepository;
        this.clienteService = clienteService;
        this.clienteRepository= clienteRepository;
    }
    public List<Pedido> listar(){
        return pedidoRepository.findAll();
    }
    public List<Pedido> listarPorCliente(Cliente cliente){
        Cliente obj = clienteRepository.findCpf(cliente.getCpf());
        return pedidoRepository.findPedidoByCliente(obj.getCodigo());
    }
    public Optional<Pedido> carregar(Integer codigo){
        return pedidoRepository.findById(codigo);
    }
    public void gravar(Pedido pedido){
        Cliente cliente = clienteRepository.findByCpf(pedido.getCliente().getCpf())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        pedido.setCliente(cliente);
        pedidoRepository.save(pedido);
    }
    public Optional<Pedido> deletar(Pedido pedido){
        Optional<Pedido> obj = pedidoRepository.findById(pedido.getCodigo());
        if(obj.isPresent()){
            pedidoRepository.delete(pedido);
        }
        return obj;
    }
    public Optional<Pedido> alterar (Pedido pedido, Integer codigo){
        return  pedidoRepository.findById(codigo).map(obj-> {
            obj.setCliente(pedido.getCliente());
            obj.setMetodoPagamento(pedido.getMetodoPagamento());
            obj.setProdutos(pedido.getProdutos());
            obj.setTotal(pedido.getTotal());
            return pedidoRepository.save(obj);
        });
    }
}
