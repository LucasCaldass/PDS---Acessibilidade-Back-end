import { Controller, Post, Body, Get, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { CreateVagaRequest } from './requests/create-vaga.request';
import { CreateVagaUseCase } from '../../application/usecases/vagas/create-vaga.usecase';
import { Vaga } from '../../domain/models/vaga.model';
import { ListAllVagasUseCase } from '../../application/usecases/vagas/list-all-vagas.usecase';
import { FindVagaByIdUseCase } from '../../application/usecases/vagas/find-vaga-by-id.usecase';
import { DeleteVagaByIdUseCase } from '../../application/usecases/vagas/delete-vaga-by-id.usecase';
import { SearchVagasUseCase } from '../../application/usecases/vagas/search-vagas.usecase';
import { SearchRecommendedVagasUseCase } from '../../application/usecases/vagas/search-recommended-vagas.usecase';

@ApiTags('Vagas')
@Controller('vagas')
export class VagasController {
  constructor(
    private readonly createVagaUseCase: CreateVagaUseCase,
    private readonly listAllVagasUseCase: ListAllVagasUseCase,
    private readonly findVagaByIdUseCase: FindVagaByIdUseCase,
    private readonly deleteVagaByIdUseCase: DeleteVagaByIdUseCase,
    private readonly searchVagasUseCase: SearchVagasUseCase,
    private readonly searchRecommendedVagasUseCase: SearchRecommendedVagasUseCase,
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
  @ApiQuery({ name: 'deficiencia', required: false, description: 'Tipo de deficiência' })
  async search(@Query('q') query: string, @Query('deficiencia') tipoDeficiencia?: string) {
    return await this.searchVagasUseCase.execute(query, tipoDeficiencia);
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

  @Get('vagas-recomendadas')
  @ApiResponse({
    status: 200,
    description: 'Listar Vagas Recomendadas',
    type: Array<Vaga>
  })
  async listRecommendedPositions(@Req() req: any): Promise<Vaga[]> {
    const userId: string = req.user.id;
    return await this.searchRecommendedVagasUseCase.execute(userId);
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
