import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GestaoService } from '../../services/gestaoservice';
import { ProdutoService } from '../../services/produtoservice';
import { Produto } from '../../modelo/produto';
import { Pedido } from '../../modelo/pedido';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.html',
  styleUrls: ['./gestao.css'],
  imports: [CommonModule, FormsModule],
})
export class Gestao implements OnInit {
  public pedidos: Pedido[] = [];
  public produtos: Produto[] = [];
  public contatos: any[] = [];
  public codigo: number = 0;
  public senha: string = '';
  public produtoEdicao: Produto | null = null;
  public mensagem: string = "";

  constructor(public gestaoService: GestaoService, public produtoService: ProdutoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.gestaoService.isLogado()) {
      this.carregarDados();
    }
  }
  carregarDados() {
    this.gestaoService.listarPedidos().subscribe({
      next: (dados: any) => {
        this.pedidos = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar os pedidos, tente novamente mais tarde!';
        this.cdr.detectChanges();
      },
    });
    this.gestaoService.listarContatos().subscribe({
      next: (dados: any) => {
        this.contatos = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar os contatos, tente novamente mais tarde!';
        this.cdr.detectChanges();
      },
    });
    this.produtoService.carregarVitrine().subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro no servidor, tente novamente mais tarde!';
        this.cdr.detectChanges();
      },
    });
  }
  prepararEdicao(produto: Produto) {
    this.produtoEdicao = { ...produto };
  }
  salvarProduto() {
    if (this.produtoEdicao && this.produtoEdicao.codigo) {
      this.gestaoService.alteraProduto(this.produtoEdicao, this.produtoEdicao.codigo).subscribe({
        next: () => {
          const index = this.produtos.findIndex((p) => p.codigo === this.produtoEdicao!.codigo);
          if (index !== -1) {
            this.produtos[index] = { ...this.produtoEdicao! };
          }
          this.produtoEdicao = null;
          this.mensagem = 'Produto atualizado com sucesso!';
          this.cdr.detectChanges();
          alert('Produto atualizado com sucesso!');
        },
        error: () => {
          this.mensagem = 'Erro ao atualizar o produto no servidor!';
          this.cdr.detectChanges();
        },
      });
    }
  }
  public autenticar() {
    this.gestaoService.autenticar(this.codigo, this.senha).subscribe({
      next: () => {
        localStorage.setItem('admin', 'true');
        this.mensagem = '';
        this.carregarDados();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensagem = err.error;
        this.cdr.detectChanges();
      },
    });
  }

  public sair() {
    this.senha="";
    this.codigo=0;
    this.mensagem="";
    this.gestaoService.logout();
    this.pedidos = [];
    this.produtos = [];
    this.contatos = [];
    this.cdr.detectChanges();
  }
}
