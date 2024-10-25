import { Inject, Injectable } from '@nestjs/common';
import { Empresa } from 'src/domain/models/empresa.model';
import { IEmpresasRepository, EmpresasRepository } from 'src/application/repositories/empresas.repository';

@Injectable()
export class ListAllEmpresasUseCase {
  constructor(@Inject(IEmpresasRepository) private readonly empresasRepository: EmpresasRepository) { }

  async execute(): Promise<Empresa[]> {
    return await this.empresasRepository.findAll();
  }
}
