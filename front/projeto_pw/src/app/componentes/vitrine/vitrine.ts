import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Produto } from '../../modelo/produto';
import { CarrinhoService } from '../../services/carrinhoservice';
import { ItemCesta } from '../../modelo/item-cesta';
import { BuscaService } from '../../services/buscaservice';
import {ProdutoService} from '../../services/produtoservice';
import { Subscription, of, Observable } from 'rxjs';
import { isPlatformBrowser, CurrencyPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './vitrine.html',
  styleUrls: ['./vitrine.css'],
})
export class Vitrine {
  mensagem: string = '';
  lista: Produto[] = [];
  private sub: Subscription = new Subscription();
  constructor(
    private produtoService: ProdutoService,
    public carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef,
  ) {
    this.carregarVitrine();
  }

  public carregarVitrine() {
    this.produtoService.carregarVitrine().subscribe({
      next: (produtos: Produto[]) => {
        this.lista = produtos;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro no servidor, tente novamente mais tarde!';
        this.cdr.detectChanges();
      },
    });
  }

  public redirecionar(obj: Produto) {
    localStorage.setItem('ProdutoSelecionado', JSON.stringify(obj));
    location.href = 'detalhe';
  }
  public comprar(obj: Produto) {
    setTimeout(() => this.carrinhoService.comprar(obj));
  }
  public adicionarAoCarrinho(obj: Produto) {
    setTimeout(() => this.carrinhoService.adicionarProduto(obj));
  }
}
