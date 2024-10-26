export const ICandidaturasRepository = 'CandidaturasRepository'

export interface CandidaturasRepository {
  apply(data: {usuarioId: string, vagaId: string}): Promise<any>;
}
