import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import {Produto} from '../modelo/produto';
import { HttpClient, httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  constructor(private http:HttpClient) {
  }
  private termoBusca = new BehaviorSubject<string>('');
  termoBusca$ = this.termoBusca.asObservable();

  atualizarTermo(termo: string) {
    this.termoBusca.next(termo);
  }
  buscarProduto(termo: string, tamanho: number = 12, page: number = 0): Observable<any> {
    return this.http.get('http://localhost:8080/produto/busca', {
      params: { termo, tamanho, page }

    });
  }
}
