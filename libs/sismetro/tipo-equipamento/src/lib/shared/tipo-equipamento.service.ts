import { TipoEquipamento } from './tipo-equipamento';
import { Injectable } from '@angular/core';
import { CrudService } from '@sigma-nx/shared';
import { TipoEquipamentoSimplificado } from './tipo-equipamento-simplificado';

@Injectable({
  providedIn: 'root',
})
export class TipoEquipamentoService extends CrudService<
  TipoEquipamento,
  TipoEquipamentoSimplificado
> {
  constructor() {
    super('/tipos-equipamentos');
  }
}
