import { Base } from '@shared/models/base';
import { Telefone } from '@shared/models/telefone';

export interface Usuario extends Base {
  email: string;
  telefone?: Telefone;
  perfilId: string;
  gestoesId?: string[];
  modulosId: string[];
}
