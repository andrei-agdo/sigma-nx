import { CrudService } from '@sigma-nx/shared';
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
