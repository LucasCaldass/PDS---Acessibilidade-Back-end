import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidaturasRepository } from '../../application/repositories/candidaturas.repository';
import { CandidaturaEntity, StatusCandidaturaEnum } from '../data/entities/candidatura.entity';
import { CandidaturaResponse } from '../../domain/models/candidatura.model';

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

  async findAllByUserId(userId: string) {
    return await this.candidaturaRepository
      .createQueryBuilder('candidatura')
      .innerJoinAndSelect('candidatura.vaga', 'vaga')
      .select(['vaga', 'candidatura.status'])
      .where('candidatura.usuarioId = :usuarioId', { usuarioId: userId })
      .getMany();
  }

  async findUsersByVagaId(vagaId: string) {
    return await this.candidaturaRepository
      .createQueryBuilder('candidatura')
      .innerJoinAndSelect('candidatura.usuario', 'usuario')
      .select(['usuario', 'candidatura.status'])
      .where('candidatura.vagaId = :vagaId', { vagaId: vagaId })
      .getMany();
    
  async findByUserAndVagaId(userId: string, vagaId: string): Promise<CandidaturaResponse> {
    return await this.candidaturaRepository
      .createQueryBuilder('candidatura')
      .where(['candidatura.vagaId = :vagaId'], { vagaId })
      .andWhere(['candidatura.usuarioId = :usuarioId'], { userId })
      .getOne()
  }

  async updateStatus(candidaturaId: string, status: StatusCandidaturaEnum): Promise<void> {
    await this.candidaturaRepository.save({ id: candidaturaId, status });
  }
}
