import { Gestao } from '@sigma-nx/administrativo/gestoes';
import { OrgaoControle } from './../../orgao-controle/shared/orgao-controle';
import { Tema } from '@sigma-nx/administrativo/temas';
import { Usuario } from '@sigma-nx/administrativo/usuarios';

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
