import { CrudService } from '@sigma-nx/shared';
import { Fornecedor } from './fornecedor';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends CrudService<Fornecedor> {
  constructor() {
    super('/fornecedores');
  }

  override save(fornecedor: Fornecedor) {
    const fornecedorBackend: Fornecedor = { ...fornecedor };

    // se o fornecedor não tiver endereço, remove o campo
    if (
      (fornecedorBackend.endereco &&
        Object.keys(fornecedorBackend.endereco).length === 0) ||
      Object.keys(fornecedorBackend.endereco!).every((v) => !v)
    )
      delete fornecedorBackend.endereco;

    if (fornecedorBackend.endereco?.numero === '')
      fornecedorBackend.endereco.numero = 'S/N';

    fornecedorBackend.telefones = fornecedorBackend.telefones?.filter(
      (t) => t.numero !== ''
    );

    return super.save(fornecedorBackend);
  }

  public override getById(id: string): Observable<Fornecedor> {
    return super.getById(id).pipe(
      map((fornecedor: Fornecedor) => {
        const _fornecedor: Fornecedor = {
          ...fornecedor,
          telefones: [{ numero: '' }, { numero: '' }],
        };

        // mapeamento de telefones
        if (fornecedor.telefones?.length) {
          fornecedor.telefones.forEach((telefone) => {
            if (!telefone.celular && _fornecedor.telefones)
              _fornecedor.telefones[0] = telefone;
            else if (telefone.celular && _fornecedor.telefones)
              _fornecedor.telefones[1] = telefone;
          });
        }

        // mapeamento de endereço
        if (!fornecedor.endereco) _fornecedor.endereco = {};

        return _fornecedor;
      })
    );
  }
}
