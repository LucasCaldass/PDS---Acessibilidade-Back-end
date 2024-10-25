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
import { UsuarioEntity } from "../infrastructure/data/entities/usuario.entity";
import { CreateUsuarioUseCase } from "./usecases/usuarios/create-usuario.usecase";
import { ListAllUsuariosUseCase } from "./usecases/usuarios/list-all-usuarios.usecase";
import { FindUsuarioByIdUseCase } from "./usecases/usuarios/find-usuario-by-id.usecase";
import { DeleteUsuarioByIdUseCase } from "./usecases/usuarios/delete-usuario-by-id.usecase";
import { IUsuariosRepository } from "./repositories/usuario.repository";
import { UsuariosRepositoryAdapter } from "../infrastructure/adapters/usuarios.repository.adapter";
import { CreateEmpresaUseCase } from "./usecases/empresas/create-empresa.usecase";
import { ListAllEmpresasUseCase } from "./usecases/empresas/list-all-empresas.usecase";
import { FindEmpresaByIdUseCase } from "./usecases/empresas/find-empresa-by-id.usecase";
import { DeleteEmpresaByIdUseCase } from "./usecases/empresas/delete-empresa-by-id.usecase";
import { IEmpresasRepository } from "./repositories/empresas.repository";
import { EmpresasRepositoryAdapter } from "src/infrastructure/adapters/empresas.repository.adapter";
import { EmpresaEntity } from "src/infrastructure/data/entities/empresa.entity";

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([VagaEntity, UsuarioEntity, EmpresaEntity])],
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
    CreateEmpresaUseCase,
    ListAllEmpresasUseCase,
    FindEmpresaByIdUseCase,
    DeleteEmpresaByIdUseCase,
    { provide: IVagasRepository, useClass: VagasRepositoryAdapter },
    { provide: IUsuariosRepository, useClass: UsuariosRepositoryAdapter},
    { provide: IEmpresasRepository, useClass: EmpresasRepositoryAdapter}
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
    CreateEmpresaUseCase,
    ListAllEmpresasUseCase,
    FindEmpresaByIdUseCase,
    DeleteEmpresaByIdUseCase,
  ]
})
export class ApplicationModule { }
