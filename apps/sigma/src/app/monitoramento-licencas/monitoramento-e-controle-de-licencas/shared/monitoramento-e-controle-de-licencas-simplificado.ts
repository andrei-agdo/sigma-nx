import { Gestao } from '@sigma-nx/administrativo/gestoes';
import { Usuario } from '../../../administrativo/usuarios/shared/usuario';
import { OrgaoControle } from './../../orgao-controle/shared/orgao-controle';
import { Tema } from '@sigma-nx/administrativo/temas';

// TEMPORARIO
interface Base {
  id?: string;
  _id?: string;
  nome?: string;
  ativo?: boolean;
  unidadeId?: string;
}
export interface MonitoramentoEControleDeLicencaSimplificado extends Base {
  tema?: Tema;
  assunto?: string;
  responsavelGeral?: Usuario;
  gestao?: Gestao;
  orgaoControle?: OrgaoControle;
  vencimento?: Base;
}
