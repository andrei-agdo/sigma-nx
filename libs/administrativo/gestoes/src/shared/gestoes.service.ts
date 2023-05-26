import { CrudService } from '@sigma-nx/services/http';
import { Gestao } from './gestao';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GestoesService extends CrudService<Gestao> {
  constructor() {
    super('/gestoes');
  }
}
