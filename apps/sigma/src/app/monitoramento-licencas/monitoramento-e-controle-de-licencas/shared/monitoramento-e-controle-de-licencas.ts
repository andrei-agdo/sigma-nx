import { Prazo } from './prazos';
import { Acao } from './acoes';

import { RequisitoLegalSimplificado } from '../../../controle-requisitos/requisito-legal/shared/requisito-legal-simplificado';
import { Gestao } from '@sigma-nx/administrativo/gestoes';
import { Tema } from '@sigma-nx/administrativo/temas';
import { Usuario } from '@sigma-nx/administrativo/usuarios';
import { Fornecedor } from '@sigma-nx/monitoramento-licencas/fornecedor';
import { OrgaoControle } from '@sigma-nx/monitoramento-licencas/orgao-controle';
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
