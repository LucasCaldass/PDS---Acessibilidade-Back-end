import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { DomainModule } from "../domain/domain.module";
import { VagasController } from "./controllers/vagas.controller";
import { UsuariosController } from "./controllers/usuarios.controller";
import { EmpresasController } from "./controllers/empresas.controller";
import { CandidaturasController } from "./controllers/candidaturas.controller";
import { CurriculosController } from "./controllers/curriculos.controller";

@Module({
  imports: [DomainModule, ApplicationModule],
  controllers: [VagasController, UsuariosController, EmpresasController, CandidaturasController, CurriculosController]
})
export class InfrastructureModule { }
