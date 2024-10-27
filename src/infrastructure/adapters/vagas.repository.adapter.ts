import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Vaga } from '../../domain/models/vaga.model';
import { VagasRepository } from '../../application/repositories/vagas.repository';
import { VagaEntity } from '../data/entities/vaga.entity';

@Injectable()
export class VagasRepositoryAdapter implements VagasRepository {
  constructor(
    @InjectRepository(VagaEntity)
    private readonly vagaRepository: Repository<VagaEntity>,
  ) {}

  async create(vaga: Vaga): Promise<Vaga> {
    const vagaEntity = await this.vagaRepository.save(vaga);
    return vagaEntity;
  }

  async findAll(): Promise<Vaga[]> {
    return await this.vagaRepository.find();
  }

  async findById(id: string): Promise<Vaga> {
    return await this.vagaRepository.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.vagaRepository.delete(id);
  }

  async search(query: string, tipoDeficiencia?: string): Promise<Array<Vaga>> {
    return await this.vagaRepository
      .createQueryBuilder('vaga')
      .where(
        new Brackets((qb) => {
          qb.where('vaga.titulo ILIKE :query', { query: `%${query}%` })
            .orWhere('vaga.cargo ILIKE :query', { query: `%${query}%` })
            .orWhere('vaga.descricao ILIKE :query', { query: `%${query}%` });
        }),
      )
      .andWhere(
        tipoDeficiencia
          ? 'vaga.tipoDeficiencia IN (:...tipoDeficiencia)'
          : '1=1',
        { tipoDeficiencia: tipoDeficiencia ? tipoDeficiencia.split(',') : [] },
      )
      .getMany();
  }

  async searchRecommended(query: string): Promise<Array<Vaga>> {
    return await this.vagaRepository
      .createQueryBuilder('vaga')
      .where(
        new Brackets((qb) => {
          qb.where('vaga.titulo ILIKE :query', { query: `%${query}%` })
            .orWhere('vaga.cargo ILIKE :query', { query: `%${query}%` })
            .orWhere('vaga.descricao ILIKE :query', { query: `%${query}%` });
        }),
      )
      .orderBy('vaga.created_at', 'DESC')
      .limit(5)
      .getMany();
  }
}
