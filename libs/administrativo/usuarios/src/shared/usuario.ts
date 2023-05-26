import { Base } from '@sigma-nx/shared';
import { Telefone } from '@sigma-nx/shared';

export interface Usuario extends Base {
  email: string;
  telefone?: Telefone;
  perfilId: string;
  gestoesId?: string[];
  modulosId: string[];
}
