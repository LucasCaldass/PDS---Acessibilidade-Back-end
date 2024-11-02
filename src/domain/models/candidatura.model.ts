import { StatusCandidaturaEnum } from "../../infrastructure/data/entities/candidatura.entity";
import { Usuario } from "./usuario.model";
import { Vaga } from "./vaga.model"

export type Candidatura = {
  vaga: Vaga;
  usuario: Usuario;
  dataCandidatura: Date;
}

export type CandidaturaResponse = Candidatura & { id: string; status: StatusCandidaturaEnum; };
