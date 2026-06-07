package br.com.fatec.apibbds.model;

public enum Status {
    PENDENTE("Pendente"), CANCELADO("Cancelado"), CONFIRMADO("Confirmado");
    public String stat;
    Status(String status) {stat=status;}
}
