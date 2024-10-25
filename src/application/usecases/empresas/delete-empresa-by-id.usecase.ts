import { Inject, Injectable } from '@nestjs/common';
import { IEmpresasRepository, EmpresasRepository } from 'src/application/repositories/empresas.repository';

@Injectable()
export class DeleteEmpresaByIdUseCase {
  constructor(@Inject(IEmpresasRepository) private readonly empresasRepository: EmpresasRepository) { }

  async execute(id: string): Promise<void> {
    return await this.empresasRepository.deleteById(id);
  }
}
