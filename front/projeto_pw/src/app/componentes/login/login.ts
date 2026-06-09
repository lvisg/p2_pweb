import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../modelo/cliente';
import { ClienteService } from '../../services/clienteservice';
import {NgxMaskDirective } from 'ngx-mask';
import { CepService } from '../../services/cep-service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  public mensagem: string = "";
  public cpf: string = "";
  public senha: string = "";


  constructor(private clienteService:ClienteService, private cepService:CepService){}
  ngOnInit(){
    this.clienteService.inicializar();
  }
  get estaLogado(): boolean {
    return this.clienteService.isLogado();
  }

  get cliente() {
    return this.clienteService.cliente;
  }
  public autenticar(cpf: string, senha: string) {
    if (!cpf || !senha) {
      this.mensagem = "Preencha todos os campos";
      return;
    }
    this.clienteService.autenticar(cpf, senha).subscribe({
      next:(obj:Cliente)=>{
        this.clienteService.cliente=obj;
        localStorage.setItem("logado", "true");
        location.href="";
      },
      error: (err) => {
      this.mensagem = err.error;
      }
    });

  }

  public atualizarDados(cliente:Cliente) {
    if (this.clienteService.cliente) {
      this.clienteService.atualizar(this.clienteService.cliente.cpf, this.clienteService.cliente).subscribe({
        next:()=>{
          this.mensagem = "Dados atualizados com sucesso!";
        },
        error:(err)=>{
          this.mensagem=err.error;
        }
      })
    }
  }

  public logout() {
    this.clienteService.logout();
  }
  buscar(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      this.cepService.buscaEndereco(cleanCep).subscribe({
        next: (dados) => {
          if(!dados.erro){
            this.clienteService.cliente!.logradouro = dados.logradouro;
            this.clienteService.cliente!.bairro = dados.bairro;
            this.clienteService.cliente!.bairro = dados.localidade;
            this.clienteService.cliente!.estado = dados.uf;
            this.mensagem = "";
          }
        },
        error: (err) => console.error('Erro ao buscar CEP', err)
      });
    }
  }
}
