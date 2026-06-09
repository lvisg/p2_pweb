import { CommonModule,CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Produto } from '../../modelo/produto';
import { CarrinhoService } from '../../services/carrinhoservice';
@Component({
  selector: 'app-detalhe',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe {
  obj: Produto = new Produto();
  mensagem: string = '';

  constructor(public carrinhoService: CarrinhoService) {}
  ngOnInit() {
    this.carregar();
  }
  carregar() {
    let json = localStorage.getItem('ProdutoSelecionado');
    if (json != null) {
      this.obj = JSON.parse(json);
    } else {
      this.mensagem = 'Produto Inválido';
    }
  }
}
