import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from '../../../domain/models/usuario.model';
import {
  IUsuariosRepository,
  UsuariosRepository,
} from '../../../application/repositories/usuario.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUsuarioUseCase {
  constructor(
    @Inject(IUsuariosRepository)
    private readonly usuariosRepository: UsuariosRepository,
  ) {}

  async execute(usuario: Usuario): Promise<Usuario> {
    const salt = Number(process.env.HASH_SALT);
    const hashedSenha = await bcrypt.hash(usuario.senha, salt);
    return this.usuariosRepository.create({ ...usuario, senha: hashedSenha });
  }
}
