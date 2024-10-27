import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Usuario, UsuarioResponse } from '../../domain/models/usuario.model';
import { UsuariosRepository } from '../../application/repositories/usuario.repository';
import { UsuarioEntity } from '../data/entities/usuario.entity';

@Injectable()
export class UsuariosRepositoryAdapter implements UsuariosRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

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

  async findByEmail(email: string): Promise<UsuarioResponse> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  async searchCurriculos(query: string): Promise<UsuarioResponse[]> {
    return await this.usuarioRepository
      .createQueryBuilder('usuario')
      .where(
        new Brackets((qb) => {
          qb.where('usuario.cargo_desejado ILIKE :query', {
            query: `%${query}%`,
          }).orWhere('usuario.resumo_curriculo ILIKE :query', {
            query: `%${query}%`,
          });
        }),
      )
      .getMany();
  }

  async deleteById(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
