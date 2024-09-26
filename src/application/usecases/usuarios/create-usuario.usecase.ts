import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../../domain/models/usuario.model';
import { IUsuariosRepository, UsuariosRepository } from '../../../application/repositories/usuario.repository';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(@Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository) { }

  async execute(usuario: Usuario): Promise<Usuario> {
    return this.usuariosRepository.create(usuario);
  }
}
