import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUsuarioUseCase } from '../../application/usecases/usuarios/create-usuario.usecase';
import { DeleteUsuarioByIdUseCase } from '../../application/usecases/usuarios/delete-usuario-by-id.usecase';
import { FindUsuarioByIdUseCase } from '../../application/usecases/usuarios/find-usuario-by-id.usecase';
import { ListAllUsuariosUseCase } from '../../application/usecases/usuarios/list-all-usuarios.usecase';
import { Usuario } from '../../domain/models/usuario.model';
import { CreateUsuarioRequest } from './requests/create-usuario.request';


@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUsuarioUseCase: CreateUsuarioUseCase,
    private readonly listAllUsuariosUseCase: ListAllUsuariosUseCase,
    private readonly findUsuarioByIdUseCase: FindUsuarioByIdUseCase,
    private readonly deleteUsuarioByIdUseCase: DeleteUsuarioByIdUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar Usuario' })
  @ApiResponse({
    status: 201,
    description: 'Criar Usuario',
  })
  async create(@Body() data: CreateUsuarioRequest): Promise<Usuario> {
    return await this.createUsuarioUseCase.execute(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listar Usuario',
    type: Array<Usuario>
  })
  async listAll(): Promise<Usuario[]> {
    return await this.listAllUsuariosUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Encontrar Usuario',
  })
  async find(@Param('id') id: string): Promise<Usuario> {
    return await this.findUsuarioByIdUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Usuario' })
  @ApiResponse({
    status: 200,
    description: 'Deletar Usuario',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteUsuarioByIdUseCase.execute(id);
  }
}
