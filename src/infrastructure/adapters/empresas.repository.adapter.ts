import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from 'src/domain/models/empresa.model';
import { EmpresasRepository } from 'src/application/repositories/empresas.repository';
import { EmpresaEntity } from '../data/entities/empresa.entity';

@Injectable()
export class EmpresasRepositoryAdapter implements EmpresasRepository {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
  ) { }

  async create(empresa: Empresa): Promise<Empresa> {
    const vagaEntity = await this.empresaRepository.save(empresa);
    return vagaEntity;
  }

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find();
  }

  async findById(id: string): Promise<Empresa> {
    return await this.empresaRepository.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.empresaRepository.delete(id)
  }
}
