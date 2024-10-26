import { Inject, Injectable } from "@nestjs/common";
import { CandidaturasRepository, ICandidaturasRepository } from "../../../application/repositories/candidaturas.repository";

@Injectable()
export class ListApplicationsUseCase {
  constructor(@Inject(ICandidaturasRepository) private readonly candidaturasRepository: CandidaturasRepository) { }

  async execute(userId: string) {
    return await this.candidaturasRepository.findAllByUserId(userId);
  }
}
