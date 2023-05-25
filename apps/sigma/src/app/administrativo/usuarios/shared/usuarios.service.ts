import { Observable } from 'rxjs';

import { Item } from '@shared/models/item.model';
import { Usuario } from './usuario';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';
import { UsuarioSimplificado } from './usuario-simplificado';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends CrudService<Usuario, UsuarioSimplificado> {
  constructor() {
    super('/usuarios');
  }

  override save(usuario: Usuario) {
    if (usuario.telefone?.numero === '') delete usuario.telefone;

    return super.save(usuario);
  }

  getModulos(): Observable<Item[]> {
    return this.http.get('/modulos', { cache: 100 });
  }
}
