import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApplyToVagaUseCase } from "../../application/usecases/candidaturas/apply-vaga.usecase";
import { ApplyVagaRequest } from "./requests/apply-vaga.request";
import { ListApplicationsUseCase } from "../../application/usecases/candidaturas/list-applications.usecase";
import { Roles } from "../../auth/roles.decorator";
import { Role } from "../../auth/role.enum";
import { UpdateCandidaturasRequest } from "./requests/update-candidaturas.request";
import { UpdateApplicationsStatusUseCase } from "../../application/usecases/candidaturas/update-applications-status.usecase";

@ApiTags('Candidaturas')
@Controller('candidaturas')
export class CandidaturasController {

  constructor(
    private readonly applyVagaUseCase: ApplyToVagaUseCase,
    private readonly listApplicationsUseCase: ListApplicationsUseCase,
    private readonly updateApplicationsStatusUseCase: UpdateApplicationsStatusUseCase,
  ) { }

  @Post()
  @Roles(Role.CANDIDATO)
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
  @Roles(Role.CANDIDATO)
  @ApiOperation({ summary: 'Listar candidaturas por usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Candidaturas'
  })
  @ApiBearerAuth()
  async listAllByUserId(@Req() req: any) {
    const userId: string = req.user.id;
    return await this.listApplicationsUseCase.execute(userId);
  }

  @Put()
  @Roles(Role.EMPRESA)
  @ApiOperation({ summary: 'Atualizar status da candidatura' })
  @ApiResponse({
    status: 200,
    description: 'Atualizar candidatura'
  })
  @ApiBearerAuth()
  async updateStatus(@Body() data: UpdateCandidaturasRequest) {
    await this.updateApplicationsStatusUseCase.execute(data)
  }
}
