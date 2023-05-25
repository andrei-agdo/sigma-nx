import { TipoEquipamento } from './tipo-equipamento';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';
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
