import { Base } from '@sigma-nx/shared';
import { Telefone } from '@shared/models/telefone';

export interface Usuario extends Base {
  email: string;
  telefone?: Telefone;
  perfilId: string;
  gestoesId?: string[];
  modulosId: string[];
}
