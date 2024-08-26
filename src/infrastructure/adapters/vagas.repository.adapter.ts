import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaga } from 'src/domain/models/vaga.model';
import { VagasRepository } from 'src/application/repositories/vagas.repository';
import { VagaEntity } from '../data/entities/vaga.entity';

@Injectable()
export class VagasRepositoryAdapter implements VagasRepository {
  constructor(
    @InjectRepository(VagaEntity)
    private readonly vagaRepository: Repository<VagaEntity>,
  ) { }

  async create(vaga: Vaga): Promise<Vaga> {
    const vagaEntity = await this.vagaRepository.save(vaga);
    return vagaEntity;
  }

  async findAll(): Promise<Vaga[]> {
    return await this.vagaRepository.find();
  }
}
