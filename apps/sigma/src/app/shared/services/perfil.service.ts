import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@sigma-nx/services/http';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: Http) { }

  get(): Observable<Perfil[]> {
    return this.http.get('/perfis', { cache: 100 });
  }
}
