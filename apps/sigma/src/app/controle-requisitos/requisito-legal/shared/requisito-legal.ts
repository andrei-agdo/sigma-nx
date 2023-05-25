import { Base } from '@shared/models/base';
export interface RequisitoLegal extends Base {
  tipoRequisitoLegalId?: string;
  origemId?: string;
  temaId?: string;
  aplicabilidadeId?: string[];
  ambitoId?: string;
  atendimentoId?: string;
  data?: Date;
  dataAnalise?: Date;
  numero?: number;
  sumario?: string;
  itemAplicavel?: string;
  alteracao?: string;
  observacoes?: string;
  gestoesId?: string[];
  departamentosId?: string[];
  gacpsId?: any[];
  controlesLicencasId?: any[];
}
