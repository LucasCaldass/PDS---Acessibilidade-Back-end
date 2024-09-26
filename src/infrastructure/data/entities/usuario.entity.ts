import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDeficienciaEnum } from './vaga.entity';

export enum TipoGeneroEnum {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO'
}

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'int' })
  idade: number;

  @Column({ type: 'enum', enum: TipoGeneroEnum })
  genero: TipoGeneroEnum;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'enum', enum: TipoDeficienciaEnum, array: true })
  tipoDeficiencia: TipoDeficienciaEnum[];

  @Column({ type: 'varchar', length: 255, array: true })
  cargosPretendidos: string[];

  @Column({ type: 'varchar', length: 255 })
  linkedin: string;
}
