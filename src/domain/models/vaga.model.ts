import { TipoDeficienciaEnum } from "src/infrastructure/controllers/requests/create-vaga.request";

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

