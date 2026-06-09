import { ItemCesta } from "../modelo/item-cesta";
import { Injectable } from "@angular/core";
import { Checkout } from "../componentes/checkout/checkout";
import { Produto } from "../modelo/produto";
import { ClienteService } from "./clienteservice";
import { Carrinho } from "../componentes/carrinho/carrinho";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService{
  public lista: ItemCesta []=[];
  public total : number =0;
  public itemCompraDireta : ItemCesta | null = null;
  public listaCompraDireta : ItemCesta[]=[];
    ngOnInit(){
      this.listaCompraDireta = [];
    }
    constructor(public clienteService : ClienteService, private router: Router){}
    adicionarProduto(produto:Produto){
        this.listaCompraDireta=[];
        let item = new ItemCesta();
        item.produto=produto;
        item.produto = produto;
        item.qtd = 1;
        let json = localStorage.getItem("carrinho");
        if(json!=null){
            this.lista = JSON.parse(json);
        }
        const itemExistente = this.lista.find(i => i.produto.codigo === item.produto.codigo);
        if(!itemExistente){
            this.lista.push(item);
            item.subTotal=item.produto.valor;
        }else{
            this.alteraQuantidade(itemExistente, itemExistente.qtd+1);
        }
        this.calculaTotal();
        localStorage.setItem("carrinho", JSON.stringify(this.lista));
        this.router.navigate(["carrinho"]);
      }
    removerProduto(item:ItemCesta){
        let json = localStorage.getItem("carrinho");
        if(json!=null){
            this.lista= JSON.parse(json);
        }
        this.lista.splice(this.lista.indexOf(item, 1));
        this.calculaTotal();
        localStorage.setItem("carrinho", JSON.stringify(this.lista));
    }
    alteraQuantidade(item: ItemCesta, qtd: any) {

        const quantidade = Number(qtd);
        item.qtd = quantidade;
        item.subTotal = quantidade * item.produto.valor;
        this.calculaTotal();
        localStorage.setItem("carrinho", JSON.stringify(this.lista));
    }
    calculaTotal(){
      this.total=0;
      if (this.listaCompraDireta.length>0){
        this.total=this.listaCompraDireta[0].produto.valor;
      }else {
        for (let item of this.lista) {
          this.total += item.subTotal;
        }
      }
    }
    checkout(valor : boolean){
        if(!this.clienteService.isLogado()){
          this.router.navigate(["login"]);
        }else if(valor){
          localStorage.removeItem("itemCompra");
          this.listaCompraDireta=[];
          this.carregarCarrinho();
          this.router.navigate(["checkout"]);
        }else{
          this.total=this.itemCompraDireta!.subTotal;
          console.log(this.total);
          this.router.navigate(["checkout"]);
        }

    }
    carregarCarrinho() {
        const json = localStorage.getItem("carrinho");
        const itemCompra = localStorage.getItem("itemCompra");
        if (itemCompra) {
            this.itemCompraDireta = JSON.parse(itemCompra);
        }else if(json){
            this.lista = JSON.parse(json);
        }
        this.calculaTotal();
    }

    comprar(produto :Produto){
        const item = new ItemCesta();
        item.produto = produto;
        this.itemCompraDireta=item;
        this.total=item.produto.valor;
        this.listaCompraDireta.push(this.itemCompraDireta);
        localStorage.setItem("itemCompra", JSON.stringify(this.itemCompraDireta));
        this.checkout(false);
    }
}
