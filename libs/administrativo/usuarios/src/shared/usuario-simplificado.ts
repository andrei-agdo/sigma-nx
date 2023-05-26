import { Base } from '@sigma-nx/shared';

export interface UsuarioSimplificado extends Base {
  readonly email: string;
  readonly perfil: string;
}
