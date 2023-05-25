import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  getById(id: string): Observable<any> {
    return of({ nome: 'Andrei Agdo' });
    //TODO : pegar o usuario por ID
    // return this.http.get(`${this.route}/${id}`);
  }

}
