import { CrudService } from '@core/services/crud.service';
import { TipoDocumento } from './tipo-documento';
import { Injectable } from '@angular/core';
import { Base } from '@shared/models/base';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService extends CrudService<TipoDocumento, Base> {
  constructor() {
    super('/tipos-documentos');
  }
}
