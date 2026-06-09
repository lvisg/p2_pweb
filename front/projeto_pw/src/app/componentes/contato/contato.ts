import {Component, ChangeDetectorRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ContatoService } from '../../services/contatoservice';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-contato',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  public nome: string = '';
  public email: string = '';
  public telefone: string = '';
  public assunto: string = '';
  public corpo: string = '';
  public mensagem: string = '';
  constructor(private contatoService: ContatoService, private cdr :ChangeDetectorRef) {}

  public enviar() {
    this.contatoService
      .salvar(this.nome, this.email, this.telefone, this.assunto, this.corpo)
      .subscribe({
        next: () => {
          this.nome="";
          this.email="";
          this.telefone="";
          this.assunto="";
          this.corpo="";
          this.mensagem = 'Mensagem encaminhada, aguarde o contato de um de nossos representantes!';
          this.cdr.detectChanges()
        },
        error:()=>{
          this.mensagem = 'Erro em sua solicitação, tente novamente mais tarde.';
          this.cdr.detectChanges();
        }
      });
  }
}
