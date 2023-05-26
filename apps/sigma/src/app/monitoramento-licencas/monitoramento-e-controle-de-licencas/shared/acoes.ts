
import { Departamento } from "@sigma-nx/administrativo/departamentos";
import { Usuario } from "@sigma-nx/administrativo/usuarios";
import { Fornecedor } from "@sigma-nx/monitoramento-licencas/fornecedor";

export interface Acao {
  id: number;
  descricao: string;
  departamento: Departamento;
  responsavel: Usuario;
  fornecedor: Fornecedor;
  prazo: Date;
  vencimento: number;
  concluido: number;
  followUp: string;
  eFornecedor: boolean;
}
