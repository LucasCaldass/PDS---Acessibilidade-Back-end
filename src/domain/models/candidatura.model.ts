import { Usuario } from "./usuario.model";
import { Vaga } from "./vaga.model"

export type Candidatura = {
  vaga: Vaga;
  usuario: Usuario;
  dataCandidatura: Date;
}
