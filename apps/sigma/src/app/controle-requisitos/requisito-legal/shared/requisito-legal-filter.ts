export interface RequisitoLegalFilter {
  ativo?: boolean;
  numero?: number;
  unidadeId?: string;
  tiposRequisitosLegaisId?: string[];
  origensId?: string[];
  temasId?: string[];
  numerosPasta?: number[];
  aplicabilidadesId?: string[];
  atendimentosId?: string[];
  gestoesId?: string[];
  dataAnalise?: string;
  palavraChave?: string;
}
