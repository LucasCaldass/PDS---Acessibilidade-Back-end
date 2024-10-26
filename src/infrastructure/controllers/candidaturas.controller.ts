import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplyToVagaUseCase } from "../../application/usecases/candidaturas/apply-vaga.usecase";
import { ApplyVagaRequest } from "./requests/apply-vaga.request";
import { ListApplicationsUseCase } from "../../application/usecases/candidaturas/list-applications.usecase";

@ApiTags('Candidaturas')
@Controller('candidaturas')
export class CandidaturasController {

  constructor(
    private readonly applyVagaUseCase: ApplyToVagaUseCase,
    private readonly listApplicationsUseCase: ListApplicationsUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Aplicar para Vaga' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação concluída',
  })
  @ApiBearerAuth()
  async apply(@Body() data: ApplyVagaRequest) {
    return await this.applyVagaUseCase.execute(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar candidaturas por usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Vagas'
  })
  @ApiBearerAuth()
  async listAllByUserId(@Req() req: any) {
    const userId: string = req.user.id;
    return await this.listApplicationsUseCase.execute(userId);
  }
}
