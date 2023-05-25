import { Base } from '@shared/models/base';

export interface UsuarioSimplificado extends Base {
  readonly email: string;
  readonly perfil: string;
}
