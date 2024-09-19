import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { DomainModule } from "../domain/domain.module";
import { VagasController } from "./controllers/vagas.controller";

@Module({
  imports: [DomainModule, ApplicationModule],
  controllers: [VagasController]
})
export class InfrastructureModule { }
