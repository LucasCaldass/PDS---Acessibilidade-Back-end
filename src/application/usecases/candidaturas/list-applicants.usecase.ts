import { Inject, Injectable } from "@nestjs/common";
import { CandidaturasRepository, ICandidaturasRepository } from "../../../application/repositories/candidaturas.repository";

@Injectable()
export class ListApplicatsUseCase {
  constructor(@Inject(ICandidaturasRepository) private readonly candidaturasRepository: CandidaturasRepository) { }

  async execute(vagaId: string) {
    return await this.candidaturasRepository.findUsersByVagaId(vagaId);
  }
}
