import { CrudService } from '@core/services/crud.service';
import { Fabricante } from './fabricante';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FabricanteSimplificado } from './fabricante-simplificado';

@Injectable({
  providedIn: 'root',
})
export class FabricanteService extends CrudService<
  Fabricante,
  FabricanteSimplificado
> {
  constructor() {
    super('/fabricantes');
  }

  override save(fabricante: Fabricante) {
    let fabricanteBackend: Fabricante = { ...fabricante };

    // se o fabricante não tiver endereço, remove o campo
    if (
      fabricanteBackend.endereco &&
      Object.keys(fabricanteBackend.endereco).length === 0
    )
      delete fabricanteBackend.endereco;

    if (fabricanteBackend.endereco?.numero === '')
      fabricanteBackend.endereco.numero = 'S/N';

    fabricanteBackend.telefones = fabricanteBackend.telefones?.filter(
      (t) => t.numero !== ''
    );

    return super.save(fabricanteBackend);
  }

  public override getById(id: string): Observable<Fabricante> {
    return super.getById(id).pipe(
      map((fabricante: Fabricante) => {
        let _fabricante: Fabricante = {
          ...fabricante,
          telefones: [{ numero: '' }, { numero: '' }],
        };

        // mapeamento de telefones
        if (fabricante.telefones?.length) {
          fabricante.telefones.forEach((telefone) => {
            if (!telefone.celular && _fabricante.telefones)
              _fabricante.telefones[0] = telefone;
            else if (telefone.celular && _fabricante.telefones)
              _fabricante.telefones[1] = telefone;
          });
        }

        return _fabricante;
      })
    );
  }
}
