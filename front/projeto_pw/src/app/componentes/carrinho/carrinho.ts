import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarrinhoService } from '../../services/carrinhoservice';
import { PedidoService } from '../../services/pedidoservice';
@Component({
  selector: 'app-carrinho',
  imports: [CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  mensagem : string ="";
  
  constructor(public carrinhoService: CarrinhoService){}
  ngOnInit(){
    let carrinho = localStorage.getItem("carrinho");
    if(carrinho==null){
      this.mensagem= "Seu carrinho está vazio!";
    }else{
      this.carrinhoService.lista = JSON.parse(carrinho);
      this.carrinhoService.calculaTotal();
    }
  }
  

  
}

