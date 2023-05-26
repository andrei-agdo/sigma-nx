import { Aplicabilidade } from './aplicabilidade';
import { Injectable } from '@angular/core';
import { CrudService } from '@sigma-nx/shared';

@Injectable({
  providedIn: 'root',
})
export class AplicabilidadeService extends CrudService<Aplicabilidade> {
  constructor() {
    super('/aplicabilidades');
  }
}
