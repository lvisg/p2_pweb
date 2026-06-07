package br.com.fatec.apibbds.model;

public enum MetodoPagamento {
    PIX("Pix"), CARTAO("Cartão de Crédito"), BOLETO("Boleto");
    public String metodoPagamento;
    MetodoPagamento(String metodo) {
        metodoPagamento=metodo;
    }
}
