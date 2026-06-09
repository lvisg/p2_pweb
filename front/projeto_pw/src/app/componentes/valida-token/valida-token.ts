import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/clienteservice';

@Component({
  selector: 'app-valida-token',
  imports: [FormsModule, CommonModule],
  templateUrl: './valida-token.html',
  styleUrl: './valida-token.css',
})
export class ValidaToken {
  public mensagem:string="";
  public token:string="";
  constructor(private clienteService: ClienteService, private router:Router) {
  }

  public validaToken(token: string) {
    this.clienteService.validaToken(this.token).subscribe({
      next: (dados) => {
        if (dados) {
          this.router.navigate(['troca-senha']);
        }
      },
      error: () => {
        this.mensagem = "Token inválido, revise-o";
      }
  });
  }
}
