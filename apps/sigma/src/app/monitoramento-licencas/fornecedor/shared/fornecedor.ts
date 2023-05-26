import { Base } from '@sigma-nx/shared';
import { Endereco } from '@shared/models/endereco';
import { Telefone } from '@shared/models/telefone';

export interface Fornecedor extends Base {
  cnpj?: string;
  endereco?: Endereco;
  telefones?: Telefone[];
  site?: string;
  email?: string;
  observacao?: string;
}
