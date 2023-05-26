import { CrudService } from './../../../../shared/crud.service';

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
