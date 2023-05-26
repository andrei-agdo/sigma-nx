import { CrudService } from '@sigma-nx/shared';
import { OrgaoControle } from './orgao-controle';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrgaoControleService extends CrudService<OrgaoControle> {
  constructor() {
    super('/orgaos-controles');
  }
}
