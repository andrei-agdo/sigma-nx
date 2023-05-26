import { CrudService } from '@sigma-nx/services/http';
import { Tema } from './tema';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemasService extends CrudService<Tema> {
  constructor() {
    super('/temas');
  }
}
