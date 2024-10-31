export const ICandidaturasRepository = 'CandidaturasRepository'

export interface CandidaturasRepository {
  apply(data: { usuarioId: string, vagaId: string }): Promise<any>;
  findAllByUserId(userId: string): Promise<any>;
  findUsersByVagaId(vagaId: string): Promise<any>;
}
