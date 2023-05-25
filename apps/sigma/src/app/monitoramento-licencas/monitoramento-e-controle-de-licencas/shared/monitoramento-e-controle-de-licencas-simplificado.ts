import { Gestao } from '../../../administrativo/gestoes/shared/gestao';
import { Tema } from '../../../administrativo/temas/shared/tema';
import { Usuario } from '../../../administrativo/usuarios/shared/usuario';
import { OrgaoControle } from './../../orgao-controle/shared/orgao-controle';

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
