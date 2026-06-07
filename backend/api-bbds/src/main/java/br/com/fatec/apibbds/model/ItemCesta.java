package br.com.fatec.apibbds.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Embeddable
public class ItemCesta {
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
    private int qtd;
    private BigDecimal subTotal;
    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQtd() {
        return qtd;
    }

    public void setQtd(int qtd) {
        this.qtd = qtd;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }
}
