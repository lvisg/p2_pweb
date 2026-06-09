import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedidoservice';
import { CarrinhoService } from '../../services/carrinhoservice';
import { ClienteService } from '../../services/clienteservice';
import { ItemCesta } from '../../modelo/item-cesta';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  public metodoPagamento : string = "";
  public mensagem : string = "";


  constructor(private pedidoService : PedidoService, public carrinhoService : CarrinhoService, public clienteService : ClienteService, private router:Router){

  }
  public finalizaPedido(lista : ItemCesta[]){
    if(this.metodoPagamento===""){
      this.mensagem="Selecione um método de Pagamento!";
    }else{
      this.pedidoService.geraPedido(this.clienteService.cliente!, this.carrinhoService.total, this.metodoPagamento, lista).subscribe({
        next:()=>{
          this.mensagem ="Pedido efetuado! Pagamento pendente."
          localStorage.removeItem("carrinho");
          localStorage.removeItem("itemCesta");
          this.router.navigate(["meus-pedidos"]);
        },
        error:(err)=>{
          this.mensagem= err.error;
        }
      });
    }
  }
  public selecionaMetodo(metodoPagamento : string){
    this.metodoPagamento=metodoPagamento;
  }

  public ngOnInit(){
    this.clienteService.inicializar();
    this.carrinhoService.carregarCarrinho();
    this.metodoPagamento="";
    this.mensagem="";
  }
}
