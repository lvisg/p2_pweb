import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Admin} from '../modelo/admin'
import {Produto} from '../modelo/produto'

@Injectable({
  providedIn: 'root',
})
export class GestaoService {
  public admin: Admin | null = null;
  public url: string = 'http://localhost:8080/';

  constructor(private http:HttpClient) {
  }

  public isLogado(): boolean {
    return localStorage.getItem('admin') === 'true';
  }
  public logout() {
    localStorage.removeItem('admin');
    this.admin = null;
  }
  public listarPedidos() {
    return this.http.get(this.url+"pedido");
  }
  public alteraProduto(produto:Produto, codigo:number){
    return this.http.put(this.url + 'produto/' + codigo, produto);
  }
  public autenticar(codigo:number, senha:string){
    return this.http.post(this.url +"gestao", {codigo,senha})
  }
  public listarContatos(){
    return this.http.get(this.url+"contato");
  }
}
