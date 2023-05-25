import { UnidadeMedida } from './unidade-medida';
import { Injectable } from '@angular/core';
import { CrudService } from '@core/services/crud.service';
import { UnidadeMedidaSimplificado } from './unidade-medida-simplificado';

@Injectable({
  providedIn: 'root',
})
export class UnidadeMedidaService extends CrudService<
  UnidadeMedida,
  UnidadeMedidaSimplificado
> {
  constructor() {
    super('/unidades-medidas');
  }
}
