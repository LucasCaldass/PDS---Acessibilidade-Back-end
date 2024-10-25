import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoDeficienciaEnum } from './vaga.entity';

export class Curso{
  nome: string;
  instituicao: string;
}

export class ExperienciaProfissional{
  empresa:string;
  cargo:string;
  periodo:string;
}

export class Idioma{
  idioma:string;
  fluencia:string;
}

export class Habilidades{
  habilidade:string;
  nivel:string;
}

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

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  senha: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @Column({ type: 'varchar', length: 255 })
  cidade: string;

  @Column({ type: 'varchar', length: 255 })
  cargo_desejado: string;

  @Column({ type: 'float' })
  salario_desejado: number;

  @Column({ type: 'enum', enum: TipoGeneroEnum })
  genero: TipoGeneroEnum;

  @Column({ type: 'enum', enum: TipoDeficienciaEnum })
  tipo_deficiencia: TipoDeficienciaEnum;

  @Column({ type: 'varchar', length: 255 })
  resumo_curriculo: string;

  @Column({ type: 'varchar', length: 255 })
  instituicao: string;

  @Column({ type: 'varchar', length: 255 })
  formacao: string;

  @Column("jsonb", { array: false, nullable: true })
  cursos: Curso[];

  @Column("jsonb", { array: false, nullable: true })
  experiencias_profissionais: ExperienciaProfissional[];

  @Column("jsonb", { array: false, nullable: true })
  idiomas: Idioma[];

  @Column("jsonb", { array: false, nullable: true })
  habilidades_qualificacoes: Habilidades[];

  @Column({ type: 'varchar', length: 255, nullable: true, default: "" })
  linkedin: string;
}
