import { Base } from '@sigma-nx/shared';
export interface RequisitoLegalSimplificado extends Base {
  id: string;
  unidadeId: string;
  ativo: boolean;
  tipoRequisitoLegal?: string;
  origem?: string;
  tema: string;
  numeroPasta: number;
  aplicabilidade?: string;
  data: Date;
  dataAnalise: Date;
  numero: number;
  sumario?: string;
  gestoes: string[];
}
