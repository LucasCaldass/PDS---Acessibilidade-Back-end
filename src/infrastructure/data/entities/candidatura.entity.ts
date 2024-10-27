import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { VagaEntity } from "./vaga.entity";

export enum StatusCandidaturaEnum {
  EM_ANALISE = 'EM_ANALISE',
  EM_PROCESSAMENTO = 'EM_PROCESSAMENTO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
}

@Entity('candidaturas')
export class CandidaturaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VagaEntity, (vaga) => vaga.candidaturas)
  vaga: VagaEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.candidaturas)
  usuario: UsuarioEntity;

  @Column({
    type: 'enum',
    enum: StatusCandidaturaEnum,
    default: StatusCandidaturaEnum.EM_ANALISE,
  })
  status: StatusCandidaturaEnum;

  @CreateDateColumn()
  dataCandidatura: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
