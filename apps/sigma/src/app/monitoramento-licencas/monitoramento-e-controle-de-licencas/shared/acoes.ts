
import { Departamento } from "@sigma-nx/administrativo/departamentos";
import { Fornecedor } from "../../fornecedor/shared/fornecedor";
import { Usuario } from "@sigma-nx/administrativo/usuarios";

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
