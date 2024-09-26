import { Module } from "@nestjs/common";
import { CreateVagaUseCase } from "./usecases/vagas/create-vaga.usecase";
import { DomainModule } from "../domain/domain.module";
import { IVagasRepository } from "./repositories/vagas.repository";
import { VagasRepositoryAdapter } from "../infrastructure/adapters/vagas.repository.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VagaEntity } from "../infrastructure/data/entities/vaga.entity";
import { ListAllVagasUseCase } from './usecases/vagas/list-all-vagas.usecase';
import { FindVagaByIdUseCase } from './usecases/vagas/find-vaga-by-id.usecase';
import { DeleteVagaByIdUseCase } from './usecases/vagas/delete-vaga-by-id.usecase';
import { SearchVagasUseCase } from "./usecases/vagas/search-vagas.usecase";
import { UsuarioEntity } from "src/infrastructure/data/entities/usuario.entity";
import { CreateUsuarioUseCase } from "./usecases/usuarios/create-usuario.usecase";
import { ListAllUsuariosUseCase } from "./usecases/usuarios/list-all-usuarios.usecase";
import { FindUsuarioByIdUseCase } from "./usecases/usuarios/find-usuario-by-id.usecase";
import { DeleteUsuarioByIdUseCase } from "./usecases/usuarios/delete-usuario-by-id.usecase";
import { IUsuariosRepository } from "./repositories/usuario.repository";
import { UsuariosRepositoryAdapter } from "src/infrastructure/adapters/usuarios.repository.adapter";

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([VagaEntity, UsuarioEntity])],
  providers: [
    CreateVagaUseCase,
    ListAllVagasUseCase,
    FindVagaByIdUseCase,
    DeleteVagaByIdUseCase,
    SearchVagasUseCase,
    CreateUsuarioUseCase,
    ListAllUsuariosUseCase,
    FindUsuarioByIdUseCase,
    DeleteUsuarioByIdUseCase,
    { provide: IVagasRepository, useClass: VagasRepositoryAdapter },
    { provide: IUsuariosRepository, useClass: UsuariosRepositoryAdapter}
  ],
  exports: [
    CreateVagaUseCase,
    ListAllVagasUseCase,
    FindVagaByIdUseCase,
    DeleteVagaByIdUseCase,
    SearchVagasUseCase,
    CreateUsuarioUseCase,
    ListAllUsuariosUseCase,
    FindUsuarioByIdUseCase,
    DeleteUsuarioByIdUseCase,
  ]
})
export class ApplicationModule { }
