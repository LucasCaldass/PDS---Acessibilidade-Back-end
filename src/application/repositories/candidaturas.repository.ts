import { CandidaturaResponse } from "../../domain/models/candidatura.model";
import { StatusCandidaturaEnum } from "../../infrastructure/data/entities/candidatura.entity";

export const ICandidaturasRepository = 'CandidaturasRepository'

export interface CandidaturasRepository {
  apply(data: { usuarioId: string, vagaId: string }): Promise<any>;
  findAllByUserId(userId: string): Promise<any>;
  findUsersByVagaId(vagaId: string): Promise<any>;
  findByUserAndVagaId(userId: string, vagaId: string): Promise<CandidaturaResponse>;
  updateStatus(candidaturaId: string, status: StatusCandidaturaEnum): Promise<void>;
}
