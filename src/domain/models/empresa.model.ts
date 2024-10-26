import { Vaga } from "./vaga.model";

export type Empresa = {
  nome_empresa: string;
  cnpj: string;
  numero_funcionarios: number;
  cidade: string;
  email: string;
  senha: string;
  telefone_fixo: string;
  sobre_empresa: string;
  vagasAnunciadas?: Vaga[];
  linkedin?: string;
}

export type EmpresaResponse = Empresa & {
  id: string;
}
