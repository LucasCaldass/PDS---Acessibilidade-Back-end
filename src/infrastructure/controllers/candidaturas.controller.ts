import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplyToVagaUseCase } from "../../application/usecases/candidaturas/apply-vaga.usecase";
import { ApplyVagaRequest } from "./requests/apply-vaga.request";

@ApiTags('Candidaturas')
@Controller('candidaturas')
export class CandidaturasController {

  constructor(
    private readonly applyVagaUseCase: ApplyToVagaUseCase,
    // private readonly listApplicationsUseCase: ListApplicationsUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Aplicar para Vaga' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação concluída',
  })
  async apply(@Body() data: ApplyVagaRequest) {
    return await this.applyVagaUseCase.execute(data);
  }

  // @Get()
  // @ApiOperation({ summary: 'Listar candidaturas por usuário' })
  // async listAllByUserId(@Param('id') id: string) {
  //   return await this.listApplicationsUseCase.execute(id);
  // }
}
