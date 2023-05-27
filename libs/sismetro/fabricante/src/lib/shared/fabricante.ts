import { Base } from '@sigma-nx/shared';
import { Endereco } from '@sigma-nx/shared';
import { Telefone } from '@sigma-nx/shared';

export interface Fabricante extends Base {
  cnpj?: string;
  email?: string;
  telefones?: Telefone[];
  site?: string;
  observacao?: string;
  eOrgaoCalibrador?: boolean;
  endereco?: Endereco;
}
