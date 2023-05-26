export interface Perfil {
  readonly id?: string;
  readonly codigo?: string;
  readonly descricao?: string;
  readonly acoes?: {
    readonly id: string;
    readonly codigo: string;
    readonly descricao: string;
  }[];
}
