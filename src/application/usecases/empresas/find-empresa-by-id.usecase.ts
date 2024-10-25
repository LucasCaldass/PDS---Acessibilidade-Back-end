import { Inject, Injectable } from '@nestjs/common';
import { Empresa } from '../../../domain/models/empresa.model';
import { IEmpresasRepository, EmpresasRepository } from '../../../application/repositories/empresas.repository';

@Injectable()
export class FindEmpresaByIdUseCase {
  constructor(@Inject(IEmpresasRepository) private readonly empresasRepository: EmpresasRepository) { }

  async execute(id: string): Promise<Empresa> {
    return await this.empresasRepository.findById(id);
  }
}
