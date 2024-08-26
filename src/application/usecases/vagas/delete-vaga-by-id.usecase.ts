import { Inject, Injectable } from '@nestjs/common';
import { IVagasRepository, VagasRepository } from 'src/application/repositories/vagas.repository';

@Injectable()
export class DeleteVagaByIdUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(id: string): Promise<void> {
    return await this.vagasRepository.deleteById(id);
  }
}
