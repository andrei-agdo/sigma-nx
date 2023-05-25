import { Departamento } from './departamento';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService extends CrudService<Departamento> {
  constructor() {
    super('/departamentos');
  }
}
