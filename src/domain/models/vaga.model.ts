import { TipoDeficienciaEnum } from "src/infrastructure/data/entities/vaga.entity";

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
}

