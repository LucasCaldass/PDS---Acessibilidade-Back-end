import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateVagaRequest } from './requests/create-vaga.request';
import { CreateVagaUseCase } from 'src/application/usecases/vagas/create-vaga.usecase';
import { Vaga } from 'src/domain/models/vaga.model';

@ApiTags('Vagas')
@Controller('vagas')
export class VagasController {
  constructor(
    private readonly createVagaUseCase: CreateVagaUseCase,
  ) { }

  @ApiOperation({ summary: 'Criar Vaga' })
  @ApiResponse({
    status: 201,
    description: 'Criar Vaga',
  })
  @Post()
  async create(@Body() data: CreateVagaRequest): Promise<Vaga> {
    return await this.createVagaUseCase.execute(data);
  }
}
