import { Inject, Injectable } from '@nestjs/common';
import { Vaga } from '../../../domain/models/vaga.model';
import { IVagasRepository, VagasRepository } from '../../../application/repositories/vagas.repository';

@Injectable()
export class FindVagaByIdUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(id: string): Promise<Vaga> {
    return await this.vagasRepository.findById(id);
  }
}
