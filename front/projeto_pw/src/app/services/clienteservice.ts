import { Injectable, Inject, PLATFORM_ID  } from '@angular/core';
import { Cliente } from '../modelo/cliente';
import {Observable} from 'rxjs';
import { HttpClient, httpResource } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClienteService{
  public cliente: Cliente | null = null;
  public mensagem : string="";
  public url:string="http://localhost:8080/cliente";
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  inicializar() {
    if (isPlatformBrowser(this.platformId)){
      let dados = localStorage.getItem("cliente");
      if (dados && localStorage.getItem("logado") === "true") {
        this.cliente = JSON.parse(dados);
      }
    }
  }
  public logout(){
    localStorage.removeItem("logado");
    this.cliente = null;
    this.mensagem = "Você saiu da conta.";
  }
  public carregar(cpf:string): Observable<Cliente>{
    return this.http.get<Cliente>(this.url+cpf);
  }
  public salvar(obj:Cliente) : Observable<any>{
    return this.http.post<any>(this.url, obj);
  }
   public isLogado(): boolean {
    return localStorage.getItem("logado") === "true";
  }
  public autenticar(cpf:string, senha:string): Observable<any>{
    return this.http.post<any>(this.url+"/login", {cpf, senha});
  }
  public atualizar(cpf:string, cliente:Cliente): Observable<any>{
    return this.http.put<any>(this.url+cpf,cliente);
  }
  public reenviaSenha(cpf: string, email: string): Observable<any> {
    this.cliente = new Cliente();
    this.cliente.cpf = cpf;
    this.cliente.email = email;
    return this.http.post<Cliente>(this.url+"/recupera-senha", this.cliente);
  }
  public validaToken(token:string): Observable<boolean>{
    return this.http.post<boolean>(this.url+"/token", token);
  }
  public trocaSenha(senha:string):Observable<Cliente>{
    this.cliente!.senha=senha;
    return this.http.patch<Cliente>(this.url, this.cliente);
  }
}

