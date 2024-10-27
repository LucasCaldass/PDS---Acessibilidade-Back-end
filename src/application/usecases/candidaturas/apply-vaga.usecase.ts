import { Inject, Injectable } from "@nestjs/common";
import { CandidaturasRepository, ICandidaturasRepository } from "../../../application/repositories/candidaturas.repository";

@Injectable()
export class ApplyToVagaUseCase {
  constructor(@Inject(ICandidaturasRepository) private readonly candidaturasRepository: CandidaturasRepository) { }

  async execute(data: { vagaId: string, usuarioId: string }) {
    return await this.candidaturasRepository.apply({ vagaId: data.vagaId, usuarioId: data.usuarioId })
  }
}
