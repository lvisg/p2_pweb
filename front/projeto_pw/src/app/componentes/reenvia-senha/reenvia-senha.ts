import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Cliente } from '../../modelo/cliente';
import { NgxMaskDirective} from 'ngx-mask';
import { ClienteService } from '../../services/clienteservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reenvia-senha',
  imports: [FormsModule,CommonModule,NgxMaskDirective],
  templateUrl: './reenvia-senha.html',
  styleUrl: './reenvia-senha.css',
})
export class ReenviaSenha {
  public mensagem:string ="";
  public cpf:string="";
  public email:string="";
  constructor(private clienteService:ClienteService, private router:Router) {
  }
  public reenviaSenha(cpf:string, email: string){
    this.clienteService.cliente=new Cliente();
    this.clienteService.cliente.cpf=cpf;
    this.clienteService.cliente.email=email;
    this.clienteService.reenviaSenha(cpf,email).subscribe({
      next:()=>{
        this.router.navigate(["valida-token"]);
      },
      error:(err)=>{
        this.mensagem=err.error;
      }
    })
    }
}
