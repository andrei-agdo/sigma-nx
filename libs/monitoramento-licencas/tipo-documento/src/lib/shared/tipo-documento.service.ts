import { CrudService } from '@sigma-nx/shared';
import { TipoDocumento } from './tipo-documento';
import { Injectable } from '@angular/core';
import { Base } from '@sigma-nx/shared';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService extends CrudService<TipoDocumento, Base> {
  constructor() {
    super('/tipos-documentos');
  }
}
