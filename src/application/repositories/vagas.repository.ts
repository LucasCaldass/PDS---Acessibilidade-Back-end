import { Vaga } from '../../domain/models/vaga.model';

export const IVagasRepository = 'VagasRepository'

export interface VagasRepository {
  create(vaga: Vaga): Promise<Vaga>;
  findAll(): Promise<Array<Vaga>>;
}
