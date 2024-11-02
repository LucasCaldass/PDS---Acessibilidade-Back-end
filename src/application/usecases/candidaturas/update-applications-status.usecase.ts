import { Inject, Injectable } from "@nestjs/common";
import { CandidaturasRepository, ICandidaturasRepository } from "../../../application/repositories/candidaturas.repository";
import { StatusCandidaturaEnum } from "../../../infrastructure/data/entities/candidatura.entity";
import { IVagasRepository, VagasRepository } from "../../../application/repositories/vagas.repository";
import { Vaga } from "../../../domain/models/vaga.model";
import { CandidaturaResponse } from "../../../domain/models/candidatura.model";

@Injectable()
export class UpdateApplicationsStatusUseCase {
  constructor(
    @Inject(ICandidaturasRepository) private readonly candidaturasRepository: CandidaturasRepository,
    @Inject(IVagasRepository) private readonly vagasRepository: VagasRepository,
  ) { }

  async execute(data: UpdateCandidaturaStatusInput) {
    const candidatura = await this.candidaturasRepository.findByUserAndVagaId(data.usuarioId, data.vagaId);
    if (!candidatura) {
      throw new Error(`Não há registros de usuário com id [${data.usuarioId}] inscrito na vaga [${data.vagaId}]`)
    }

    const vaga = await this.vagasRepository.findById(data.vagaId);

    if (this.areAllConditionsMet(vaga, candidatura, data.status)) {
      await this.candidaturasRepository.updateStatus(candidatura.id, data.status);
    }
  }

  private areAllConditionsMet(vaga: Vaga, candidatura: CandidaturaResponse, status: StatusCandidaturaEnum): boolean {
    // if (vaga.status !== 'OPENED') {
    //   throw new Error('Vaga está fechada')
    // }
    if (candidatura.status === StatusCandidaturaEnum.REPROVADO) {
      throw new Error('Candidatura não pode mais ser atualizada')
    }
    return true;
  }
}

export type UpdateCandidaturaStatusInput = {
  usuarioId: string;
  vagaId: string;
  status: StatusCandidaturaEnum;
}
