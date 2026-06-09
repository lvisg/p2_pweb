import { Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Produto } from '../modelo/produto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http:HttpClient){

  }
  public carregarVitrine(){
    return this.http.get<Produto[]>("http://localhost:8080/produto");
  }
  public carregarProduto(codigo:number){
    return this.http.get<Produto>("http://localhost:8080/produto/"+codigo);
  }

}
