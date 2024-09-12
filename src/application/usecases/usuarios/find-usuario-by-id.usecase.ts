import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from 'src/domain/models/usuario.model';
import { IUsuariosRepository, UsuariosRepository } from 'src/application/repositories/usuario.repository';

@Injectable()
export class FindUsuarioByIdUseCase {
  constructor(@Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository) { }

  async execute(id: string): Promise<Usuario> {
    return await this.usuariosRepository.findById(id);
  }
}
