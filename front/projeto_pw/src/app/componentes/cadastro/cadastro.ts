import { Component, ChangeDetectorRef } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Cliente} from '../../modelo/cliente';
import { NgxMaskDirective} from 'ngx-mask';
import { CepService } from '../../services/cep-service';
import {ClienteService} from '../../services/clienteservice'

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  public nome: string = "";
  public sobrenome: string = "";
  public email: string = "";
  public telefone: string = "";
  public cpf: string = "";
  public cep: string = "";
  public logradouro: string = "";
  public numero: string = "";
  public complemento: string = "";
  public bairro: string = "";
  public cidade: string = "";
  public senha: string = "";
  public estado : string ="";
  public mensagem: string = "";
  public cliente: Cliente = new Cliente;
  constructor(private cdr:ChangeDetectorRef,private cepService:CepService, private clienteService:ClienteService){}

  public cadastrar(nome: string,sobrenome: string,  email: string, telefone: string, cpf: string, cep: string, logradouro: string, numero: string, complemento: string, bairro: string, cidade: string, senha: string, estado:string) {
    this.cliente.senha = senha;
    this.cliente.sobrenome = sobrenome;
    this.cliente.nome = nome;
    this.cliente.cpf = cpf;
    this.cliente.email = email;
    this.cliente.telefone = telefone;
    this.cliente.cep = cep;
    this.cliente.logradouro = logradouro;
    this.cliente.numero = numero;
    this.cliente.complemento = complemento;
    this.cliente.bairro = bairro;
    this.cliente.cidade = cidade;
    this.cliente.estado = estado;

    this.clienteService.salvar(this.cliente).subscribe({
      next: () => {
        this.mensagem = "Cadastro efetuado!";
        location.href="login";
      },
      error: (err) => {
        this.mensagem = err.error;
      }
    });

  }
  buscar(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      this.cepService.buscaEndereco(cleanCep).subscribe({
        next: (dados) => {
          if(!dados.erro){
            this.logradouro = dados.logradouro;
            this.bairro = dados.bairro;
            this.cidade = dados.localidade;
            this.estado = dados.uf;
            this.mensagem = "";
          }
        },
        error: (err) => {
          this.mensagem='Erro ao buscar CEP';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
