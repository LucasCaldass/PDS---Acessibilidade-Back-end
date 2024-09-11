import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async findById(id: string): Promise<Vaga> {
    return await this.vagaRepository.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.vagaRepository.delete(id)
  }

  async search(query: string): Promise<Array<Vaga>> {
    return await this.vagaRepository.find({
      where: [
        { titulo: ILike(`%${query}%`) },
        { cargo: ILike(`%${query}%`) },
        { descricao: ILike(`%${query}%`) },
      ]
    });
  }
}
