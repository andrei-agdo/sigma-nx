export interface Endereco {
  id?: string;
  estadoId?: string;
  codigoPostal?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro: boolean;
}

export interface Estado {
  id: string;
  uf: string;
  denominacao: string;
}
