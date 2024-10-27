import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchCurriculosUseCase } from '../../application/usecases/curriculos/search-curriculos.usecase';

@ApiBearerAuth()
@ApiTags('Curriculos')
@Controller('curriculos')
export class CurriculosController {
  constructor(
    private readonly searchCurriculosUseCase: SearchCurriculosUseCase,
  ) {}

  @Get('search')
  @ApiOperation({ summary: 'Buscar por Curriculos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de curriculos encontrados ou array vazio',
  })
  async search(@Query('q') query: string) {
    console.log(query);
    return await this.searchCurriculosUseCase.execute(query);
  }
}
