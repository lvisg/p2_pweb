package br.com.fatec.apibbds.model;

import jakarta.mail.FetchProfile;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import br.com.fatec.apibbds.model.ItemCesta;
import java.math.BigDecimal;
import java.util.*;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;
    @ManyToOne
    private Cliente cliente;
    private Status status;
    private BigDecimal total;
    @ElementCollection
    @CollectionTable(name = "pedido_produtos", joinColumns = @JoinColumn(name = "pedido_id"))
    private List<ItemCesta> produtos = new ArrayList<>();
    private MetodoPagamento metodoPagamento;

    public Pedido(){
    }
    public MetodoPagamento getMetodoPagamento() {
        return metodoPagamento;
    }
    public void setMetodoPagamento(MetodoPagamento metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }
    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<ItemCesta> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ItemCesta> produtos) {
        this.produtos = produtos;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
}
