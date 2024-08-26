import { Module } from "@nestjs/common";
import { ApplicationModule } from "src/application/application.module";
import { DomainModule } from "src/domain/domain.module";
import { VagasController } from "./controllers/vagas.controller";

@Module({
  imports: [DomainModule, ApplicationModule],
  controllers: [VagasController]
})
export class InfrastructureModule {}
