import { CrudService } from '@sigma-nx/shared';
import { Tipo } from './tipo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TipoService extends CrudService<Tipo> {
  constructor() {
    super('/tipos-requisitos-legais');
  }
}
