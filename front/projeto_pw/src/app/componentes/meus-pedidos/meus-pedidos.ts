import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PedidoService } from '../../services/pedidoservice';
import { ClienteService } from '../../services/clienteservice';
import {Pedido} from '../../modelo/pedido'
import { CurrencyPipe, CommonModule} from '@angular/common';
@Component({
  selector: 'app-meus-pedidos',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {
  public mensagem: string = '';
  public pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.pedidoService.carregaPedidoPorCliente(this.clienteService.cliente!).subscribe({
      next: (dados: Pedido[]) => {
        this.pedidos = [...dados];
        console.log(this.pedidos);
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Não foram localizados pedidos!';
      },
    });
  }
  get cliente() {
    return this.clienteService.cliente;
  }
  get estaLogado():boolean{
    return this.clienteService.isLogado();
  }
}
