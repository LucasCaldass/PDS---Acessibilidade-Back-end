import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaga } from './vaga.entity';

@Injectable()
export class VagasService {
  constructor(
    @InjectRepository(Vaga)
    private vagasRepository: Repository<Vaga>,
  ) {}

  findAll(): Promise<Vaga[]> {
    return this.vagasRepository.find();
  }

  findOne(id: number): Promise<Vaga> {
    return this.vagasRepository.findOneBy({ id });
  }

  create(vaga: Vaga): Promise<Vaga> {
    return this.vagasRepository.save(vaga);
  }

  async remove(id: number): Promise<void> {
    await this.vagasRepository.delete(id);
  }
}
