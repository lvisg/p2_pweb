import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { RouterOutlet, Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BuscaService } from './services/buscaservice';
import { ClienteService } from './services/clienteservice';
import {Produto} from './modelo/produto';
import { CarrinhoService } from './services/carrinhoservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  termo: string = '';

  constructor(private buscaService: BuscaService, public clienteService:ClienteService,private carrinhoService: CarrinhoService, private router: Router) {}
  public buscarProduto(termo:string){
    this.buscaService.atualizarTermo(termo);
    this.router.navigate(['/busca']);
  }
  ngOnInit(){
    this.clienteService.inicializar();
    this.carrinhoService.ngOnInit();
  }
  public sair(){
    this.clienteService.logout();
    this.router.navigate(['']);
  }
}
