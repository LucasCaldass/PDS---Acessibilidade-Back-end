import { Vaga } from "./vaga.model";

export type Empresa = {
  nome: string;
  areaAtuacao: string;
  endereco: string;
  telefone: string;
  vagasAnunciadas?: Vaga[];
  linkedin: string;
}

