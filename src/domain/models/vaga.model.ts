import { TipoDeficienciaEnum } from "../../infrastructure/data/entities/vaga.entity";
import { Empresa } from "./empresa.model";

export type Vaga = {
  titulo: string;
  cargo: string;
  descricao: string;
  salario: number;
  requisitos: string;
  tipoDeficiencia: TipoDeficienciaEnum;
  endereco: string;
  remota: boolean;
  informacoesAdicionais?: string;
  empresa: Empresa;
}

export type VagaResult = Vaga & { id: string; }
