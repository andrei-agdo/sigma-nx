import { Ambito } from './ambito';
import { Injectable } from '@angular/core';
import { CrudService } from '@sigma-nx/shared';

@Injectable({
  providedIn: 'root',
})
export class AmbitoService extends CrudService<Ambito> {
  constructor() {
    super('/ambitos');
  }
}
