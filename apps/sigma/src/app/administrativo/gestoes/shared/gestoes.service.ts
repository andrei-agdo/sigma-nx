import { Gestao } from './gestao';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class GestoesService extends CrudService<Gestao> {
  constructor() {
    super('/gestoes');
  }
}
