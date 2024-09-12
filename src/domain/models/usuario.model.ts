import { TipoDeficienciaEnum } from "src/infrastructure/controllers/requests/create-vaga.request";
import { TipoGeneroEnum } from "src/infrastructure/controllers/requests/create-usuario.request";

export type Usuario = {
  nome: string;
  idade: number;
  genero: TipoGeneroEnum;
  endereco: string;
  telefone: string;
  tipoDeficiencia: TipoDeficienciaEnum[];
  cargosPretendidos: string[];
  linkedin: string;
}

