import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/domain/models/usuario.model';
import { UsuariosRepository } from 'src/application/repositories/usuario.repository';
import { UsuarioEntity } from '../data/entities/usuario.entity';

@Injectable()
export class UsuariosRepositoryAdapter implements UsuariosRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }

  async create(usuario: Usuario): Promise<Usuario> {
    const usuarioEntity = await this.usuarioRepository.save(usuario);
    return usuarioEntity;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: string): Promise<Usuario> {
    return await this.usuarioRepository.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.usuarioRepository.delete(id)
  }

}
