import { CrudService } from '@core/services/crud.service';
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
