import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateVagaRequest } from './requests/create-vaga.request';
import { CreateVagaUseCase } from 'src/application/usecases/vagas/create-vaga.usecase';
import { Vaga } from 'src/domain/models/vaga.model';
import { ListAllVagasUseCase } from 'src/application/usecases/vagas/list-all-vagas.usecase';
import { FindVagaByIdUseCase } from 'src/application/usecases/vagas/find-vaga-by-id.usecase';
import { DeleteVagaByIdUseCase } from 'src/application/usecases/vagas/delete-vaga-by-id.usecase';
import { SearchVagasUseCase } from 'src/application/usecases/vagas/search-vagas.usecase';

@ApiTags('Vagas')
@Controller('vagas')
export class VagasController {
  constructor(
    private readonly createVagaUseCase: CreateVagaUseCase,
    private readonly listAllVagasUseCase: ListAllVagasUseCase,
    private readonly findVagaByIdUseCase: FindVagaByIdUseCase,
    private readonly deleteVagaByIdUseCase: DeleteVagaByIdUseCase,
    private readonly searchVagasUseCase: SearchVagasUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar Vaga' })
  @ApiResponse({
    status: 201,
    description: 'Criar Vaga',
  })
  async create(@Body() data: CreateVagaRequest): Promise<Vaga> {
    return await this.createVagaUseCase.execute(data);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar por Vagas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vagas encontradas ou array vazio',
  })
  async search(@Query('q') query: string) {
    return await this.searchVagasUseCase.execute(query);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listar Vagas',
    type: Array<Vaga>
  })
  async listAll(): Promise<Vaga[]> {
    return await this.listAllVagasUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar Vaga' })
  @ApiResponse({
    status: 200,
    description: 'Encontrar Vaga',
  })
  async find(@Param('id') id: string): Promise<Vaga> {
    return await this.findVagaByIdUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar Vaga' })
  @ApiResponse({
    status: 200,
    description: 'Deletar Vaga',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteVagaByIdUseCase.execute(id);
  }
}
