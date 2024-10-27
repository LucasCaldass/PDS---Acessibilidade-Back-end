import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateEmpresaUseCase } from '../../application/usecases/empresas/create-empresa.usecase';
import { ListAllEmpresasUseCase } from '../../application/usecases/empresas/list-all-empresas.usecase';
import { FindEmpresaByIdUseCase } from '../../application/usecases/empresas/find-empresa-by-id.usecase';
import { DeleteEmpresaByIdUseCase } from '../../application/usecases/empresas/delete-empresa-by-id.usecase';
import { Empresa } from '../../domain/models/empresa.model';
import { CreateEmpresaRequest } from './requests/create-empresa.request';
import * as bcrypt from 'bcrypt';
import { Public } from '../../auth/public-routes';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController {
  constructor(
    private readonly createEmpresaUseCase: CreateEmpresaUseCase,
    private readonly listAllEmpresasUseCase: ListAllEmpresasUseCase,
    private readonly findEmpresaByIdUseCase: FindEmpresaByIdUseCase,
    private readonly deleteEmpresaByIdUseCase: DeleteEmpresaByIdUseCase,
  ) { }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar Empresa' })
  @ApiResponse({
    status: 201,
    description: 'Empresa Criada',
  })
  @ApiConflictResponse({
    status: 400,
    description: 'E-mail já está em uso.',
  })
  async create(@Body() data: CreateEmpresaRequest): Promise<Empresa> {
    const salt = process.env.HASH_SAHT;
    const hashedSenha = await bcrypt.hash(data.senha, salt);
    return await this.createEmpresaUseCase.execute({ ...data, senha: hashedSenha });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listar Empresa',
    type: Array<Empresa>
  })
  @ApiBearerAuth()
  async listAll(): Promise<Empresa[]> {
    return await this.listAllEmpresasUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar Empresa' })
  @ApiResponse({
    status: 200,
    description: 'Encontrar Empresa',
  })
  @ApiBearerAuth()
  async find(@Param('id') id: string): Promise<Empresa> {
    return await this.findEmpresaByIdUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Empresa' })
  @ApiResponse({
    status: 200,
    description: 'Deletar Empresa',
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteEmpresaByIdUseCase.execute(id);
  }
}
