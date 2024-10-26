import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';

export enum TipoDeficienciaEnum {
  VISUAL = 'VISUAL',
  AUDITIVA = 'AUDITIVA',
  MOTORA = 'MOTORA'
};

@Entity('vagas')
export class VagaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 255 })
  cargo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salario: number;

  @Column({ type: 'text' })
  requisitos: string;

  @Column({ type: 'enum', enum: TipoDeficienciaEnum })
  tipoDeficiencia: TipoDeficienciaEnum;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @Column({ type: 'boolean' })
  remota: boolean;

  @Column({ type: 'text' })
  informacoesAdicionais: string;

  @Column({ type: 'varchar', length: 255 })
  localizacao: string;

  @ManyToOne(() => EmpresaEntity, (empresa) => empresa.vagasAnunciadas)
  empresa: EmpresaEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
