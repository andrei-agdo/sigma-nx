import { CrudService } from './../../../../../shared/crud.service';
import { Departamento } from './departamento';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService extends CrudService<Departamento> {
  constructor() {
    super('/departamentos');
  }
}
