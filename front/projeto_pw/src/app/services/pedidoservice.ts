import { Injectable } from '@angular/core';
import { Pedido } from '../modelo/pedido';
import { Cliente } from '../modelo/cliente';
import { ItemCesta } from '../modelo/item-cesta';
import { Checkout } from '../componentes/checkout/checkout';
import { CarrinhoService } from './carrinhoservice';
import { HttpClient,httpResource } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  pedido : Pedido | null= null;
  cliente : Cliente | null = null
  public url:string="http://localhost:8080/pedido";
  constructor(private http:HttpClient) {
  }

  public geraPedido(cliente : Cliente,total: number, metodoPagamento:string, produtos:ItemCesta[]){
    this.pedido = new Pedido(cliente, total, metodoPagamento, produtos);
    return this.http.post<Pedido>(this.url, this.pedido);
  }
  public carregaPedidoPorCliente(cliente: Cliente):Observable<Pedido[]> {
    return this.http.post<Pedido[]>(this.url+"/cliente", cliente);
  }
}
