import { Inject, Injectable } from '@nestjs/common';
import { Vaga } from '../../../domain/models/vaga.model';
import { IVagasRepository, VagasRepository } from '../../../application/repositories/vagas.repository';

@Injectable()
export class CreateVagaUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(vaga: Vaga): Promise<Vaga> {
    return this.vagasRepository.create(vaga);
  }
}
