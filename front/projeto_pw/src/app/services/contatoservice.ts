import { Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  public url: string = 'http://localhost:8080/contato';

  constructor(private http: HttpClient) {}
  public salvar(nome: string, email: string, telefone: string, assunto: string, corpo: string) {
    return this.http.post(this.url,{nome, email, telefone, assunto,corpo});
  }
  public listar(){
    return this.http.get(this.url);
  }
}
