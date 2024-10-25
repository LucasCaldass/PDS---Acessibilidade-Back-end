import { Inject, Injectable } from '@nestjs/common';
import { Empresa } from 'src/domain/models/empresa.model';
import { IEmpresasRepository, EmpresasRepository } from 'src/application/repositories/empresas.repository';

@Injectable()
export class CreateEmpresaUseCase {
  constructor(@Inject(IEmpresasRepository) private readonly empresasRepository: EmpresasRepository) { }

  async execute(empresa: Empresa): Promise<Empresa> {
    empresa.vagasAnunciadas = [];
    return this.empresasRepository.create(empresa);
  }
}
