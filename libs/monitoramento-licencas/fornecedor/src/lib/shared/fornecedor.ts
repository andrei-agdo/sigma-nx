import { Base } from '@sigma-nx/shared';
import { Endereco } from '@sigma-nx/shared';
import { Telefone } from '@sigma-nx/shared';

export interface Fornecedor extends Base {
  cnpj?: string;
  endereco?: Endereco;
  telefones?: Telefone[];
  site?: string;
  email?: string;
  observacao?: string;
}
