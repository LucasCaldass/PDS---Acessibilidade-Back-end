import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidaturasRepository } from '../../application/repositories/candidaturas.repository';
import { CandidaturaEntity, StatusCandidaturaEnum } from '../data/entities/candidatura.entity';

@Injectable()
export class CandidaturasRepositoryAdapter implements CandidaturasRepository {
  constructor(
    @InjectRepository(CandidaturaEntity)
    private readonly candidaturaRepository: Repository<CandidaturaEntity>,
  ) { }

  async apply(data: { usuarioId: string; vagaId: string; }) {
    const candidatura = this.candidaturaRepository.create({
      usuario: { id: data.usuarioId },
      vaga: { id: data.vagaId },
      status: StatusCandidaturaEnum.EM_ANALISE,
    });

    return await this.candidaturaRepository.save(candidatura);
  }
}
