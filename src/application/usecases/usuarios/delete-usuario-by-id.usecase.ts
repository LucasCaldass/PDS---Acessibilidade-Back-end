import { Inject, Injectable } from '@nestjs/common';
import { IUsuariosRepository, UsuariosRepository } from '../../../application/repositories/usuario.repository';

@Injectable()
export class DeleteUsuarioByIdUseCase {
  constructor(@Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository) { }

  async execute(id: string): Promise<void> {
    return await this.usuariosRepository.deleteById(id);
  }
}
