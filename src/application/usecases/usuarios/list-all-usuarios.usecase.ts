import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../../domain/models/usuario.model';
import { IUsuariosRepository, UsuariosRepository } from '../../../application/repositories/usuario.repository';

@Injectable()
export class ListAllUsuariosUseCase {
  constructor(@Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository) { }

  async execute(): Promise<Usuario[]> {
    return await this.usuariosRepository.findAll();
  }
}
