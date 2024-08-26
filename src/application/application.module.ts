import { Module } from "@nestjs/common";
import { CreateVagaUseCase } from "./usecases/vagas/create-vaga.usecase";
import { DomainModule } from "src/domain/domain.module";
import { IVagasRepository } from "./repositories/vagas.repository";
import { VagasRepositoryAdapter } from "src/infrastructure/adapters/vagas.repository.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VagaEntity } from "src/infrastructure/data/entities/vaga.entity";

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([VagaEntity])],
  providers: [
    CreateVagaUseCase,
    { provide: IVagasRepository, useClass: VagasRepositoryAdapter }
  ],
  exports: [CreateVagaUseCase]
})
export class ApplicationModule { }
