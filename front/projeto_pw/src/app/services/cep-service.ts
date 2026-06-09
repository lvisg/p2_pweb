import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cep } from '../modelo/cep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) { }


  public buscaEndereco(cep :string): Observable<Cep> {
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
