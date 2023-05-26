import { Http } from '@sigma-nx/services/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Address, Endereco, Estado } from './endereco';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private estados: Estado[] = [];

  constructor(private http: Http) { }

  getEstados() {
    return this.estados.length > 0
      ? of(this.estados)
      : this.http
        .get<Estado[]>('/estados')
        .pipe(map((estados) => (this.estados = estados)));
  }

  getAddressByCodigoPostal(codigoPostal: string) {
    return new Observable<Endereco>((ob) => {
      this.http
        .getExternal<Address>(`https://viacep.com.br/ws/${codigoPostal}/json/`)
        .subscribe(
          ({ logradouro, complemento, bairro, localidade, uf, erro }) => {
            if (!erro)
              ob.next({
                logradouro,
                complemento,
                bairro,
                cidade: localidade,
                estadoId: this.estados.find((e) => e.uf === uf)?.id,
                codigoPostal,
                numero: '',
              });
            else {
              ob.error('CEP não encontrato');
            }
            ob.complete();
          }
        );
    });
  }
}
