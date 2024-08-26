import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateVagaRequest } from './requests/create-vaga.request';
import { CreateVagaUseCase } from 'src/application/usecases/vagas/create-vaga.usecase';
import { Vaga } from 'src/domain/models/vaga.model';
import { ListAllVagasUseCase } from 'src/application/usecases/vagas/list-all-vagas.usecase';
import { FindVagaByIdUseCase } from 'src/application/usecases/vagas/find-vaga-by-id.usecase';

@ApiTags('Vagas')
@Controller('vagas')
export class VagasController {
  constructor(
    private readonly createVagaUseCase: CreateVagaUseCase,
    private readonly listAllVagasUseCase: ListAllVagasUseCase,
    private readonly findVagaByIdUseCase: FindVagaByIdUseCase,
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
  @ApiOperation({summary: 'Encontrar Vaga'})
  @ApiResponse({
    status: 200,
    description: 'Encontrar Vaga',
  })
  async find(@Param('id') id: string): Promise<Vaga> {
    return await this.findVagaByIdUseCase.execute(id);
  }
}
