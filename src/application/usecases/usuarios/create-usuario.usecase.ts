import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from 'src/domain/models/usuario.model';
import { IUsuariosRepository, UsuariosRepository } from 'src/application/repositories/usuario.repository';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(@Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository) { }

  async execute(usuario: Usuario): Promise<Usuario> {
    return this.usuariosRepository.create(usuario);
  }
}
