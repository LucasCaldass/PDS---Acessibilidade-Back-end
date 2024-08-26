import { Inject, Injectable } from '@nestjs/common';
import { Vaga } from '../../../domain/models/vaga.model';
import { IVagasRepository, VagasRepository } from 'src/application/repositories/vagas.repository';

@Injectable()
export class ListAllVagasUseCase {
  constructor(@Inject(IVagasRepository) private readonly vagasRepository: VagasRepository) { }

  async execute(): Promise<Vaga[]> {
    return await this.vagasRepository.findAll();
  }
}
