import { Base } from '@sigma-nx/shared';
import { Endereco } from '@shared/models/endereco';
import { Telefone } from '@shared/models/telefone';

export interface Fabricante extends Base {
  cnpj?: string;
  email?: string;
  telefones?: Telefone[];
  site?: string;
  observacao?: string;
  eOrgaoCalibrador?: boolean;
  endereco?: Endereco;
}
