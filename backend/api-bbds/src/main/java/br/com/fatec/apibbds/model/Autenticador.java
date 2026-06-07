package br.com.fatec.apibbds.model;

public class Autenticador {
    private String token;
    private boolean usado;

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public boolean isUsado() {
        return usado;
    }
    public void setUsado(boolean usado) {
        this.usado = usado;
    }
}
