import { OrgaoControle } from '../../orgao-controle/shared/orgao-controle';
import { Fornecedor } from '../../fornecedor/shared/fornecedor';
import { Prazo } from './prazos';
import { Acao } from './acoes';
import { Tema } from '../../../administrativo/temas/shared/tema';
import { Usuario } from '../../../administrativo/usuarios/shared/usuario';
import { Gestao } from '../../../administrativo/gestoes/shared/gestao';
import { RequisitoLegalSimplificado } from '../../../controle-requisitos/requisito-legal/shared/requisito-legal-simplificado';
//TEMPORARIO
interface Base {
  id?: string;
  _id?: string;
  nome?: string;
  ativo?: boolean;
  unidadeId?: string;
}
export interface MonitoramentoEControleDeLicenca extends Base {
  referenciaId?: string;
  referencia?: Base;
  temaId?: string;
  tema?: Tema;
  numeroPasta?: number;
  documentoId?: string;
  documento?: Base;
  responsavelId?: string;
  responsavel?: Usuario;
  orgaoControleId?: string;
  orgaoControle?: OrgaoControle;
  gestaoId?: string;
  gestao?: Gestao;
  fornecedorId?: string;
  fornecedor?: Fornecedor;
  assunto?: string;
  vencimentoId?: string;
  vencimento?: {
    id?: string;
    _id?: string;
    nome?: 'Indeterminado' | 'Por Prazo' | 'Obsoleto';
  };
  periodicidadeId?: string;
  periodicidade?: Base & { day: number };
  anos?: number;
  ativo: boolean;
  empresaId?: string;
  empresa?: Base;
  legislacaoAplicada: RequisitoLegalSimplificado[];
  prazos: Prazo[];
  acoes: Acao[];
}
