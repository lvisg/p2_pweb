import {ChangeDetectorRef, Component} from '@angular/core';
import { BuscaService } from '../../services/buscaservice';
import {Produto} from "../../modelo/produto";
import { CarrinhoService } from '../../services/carrinhoservice';
@Component({
  selector: 'app-busca',
  imports: [],
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  mensagem:string="";
  lista: Produto[] =[];
  constructor(public carrinhoService: CarrinhoService, private buscaService:BuscaService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.buscaService.termoBusca$.subscribe(termo => {
      if (termo) this.buscar(termo);
    });
  }
  buscar(termo: string) {
    this.mensagem = '';
    this.buscaService.buscarProduto(termo).subscribe({
      next: (resultado: any) => {
        this.lista = [...resultado.content];
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Nenhum produto encontrado!';
      }
    });
  }
  public redirecionar(obj: Produto) {
    localStorage.setItem("ProdutoSelecionado", JSON.stringify(obj));
    location.href = "detalhe";
  }

}
