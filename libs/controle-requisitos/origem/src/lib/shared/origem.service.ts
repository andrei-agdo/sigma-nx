import { CrudService } from '@sigma-nx/shared';
import { Origem } from './origem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrigemService extends CrudService<Origem> {
  constructor() {
    super('/origens');
  }
}
