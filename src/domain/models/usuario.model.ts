import { TipoGeneroEnum } from "../../infrastructure/data/entities/usuario.entity";
import { TipoDeficienciaEnum } from "../../infrastructure/data/entities/vaga.entity";

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

