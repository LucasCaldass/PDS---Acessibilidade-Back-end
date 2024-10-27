import { Inject, Injectable } from '@nestjs/common';
import {
  IUsuariosRepository,
  UsuariosRepository,
} from 'src/application/repositories/usuario.repository';

@Injectable()
export class SearchCurriculosUseCase {
  constructor(
    @Inject(IUsuariosRepository)
    private readonly usuariosRepository: UsuariosRepository,
  ) {}

  async execute(query: string) {
    console.log('looking for: ', query);
    return await this.usuariosRepository.searchCurriculos(query);
  }
}
