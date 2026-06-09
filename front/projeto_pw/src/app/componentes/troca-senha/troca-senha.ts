import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/clienteservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-troca-senha',
  imports: [FormsModule, CommonModule],
  templateUrl: './troca-senha.html',
  styleUrl: './troca-senha.css',
})
export class TrocaSenha {
  public senha: string="";
  public confirmacao:string="";
  public mensagem:string=""
  constructor(private clienteService:ClienteService, private router:Router) {
  }
  public trocaSenha(senha :string, confirmacao:string){
    if(senha==confirmacao){
      console.log("clicou")
      this.clienteService.trocaSenha(senha).subscribe({
        next:()=>{
          this.mensagem="Senha alterada, realize novo login!"
          this.router.navigate(["login"]);
      },
      error:(err)=>{
          this.mensagem= err.error;
      }
      });
    }else {
      this.mensagem="Senha e confirmação precisam ser iguais"
    }
  }
}
