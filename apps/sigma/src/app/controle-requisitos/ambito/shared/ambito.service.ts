import { Ambito } from './ambito';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class AmbitoService extends CrudService<Ambito> {
  constructor() {
    super('/ambitos');
  }
}
