import { Vaga, VagaResult } from '../../domain/models/vaga.model';

export const IVagasRepository = 'VagasRepository'

export interface VagasRepository {
  create(vaga: Vaga): Promise<VagaResult>;
  findAll(): Promise<Array<VagaResult>>;
  findById(id: string): Promise<VagaResult>;
  deleteById(id: string): Promise<void>;
  search(params: any, tipoDeficiencia?: string): Promise<Array<VagaResult>>;
  searchRecommended(params: string): Promise<Array<VagaResult>>;
}
