
import { Departamento } from "../../../administrativo/departamentos/shared/departamento";
import { Usuario } from "../../../administrativo/usuarios/shared/usuario";
import { Fornecedor } from "../../fornecedor/shared/fornecedor";

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