import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VagaEntity } from './vaga.entity';

@Entity('empresas')
export class EmpresaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome_empresa: string;

  @Column({ type: 'varchar', length: 255 })
  cnpj: string;

  @Column({ type: 'int' })
  numero_funcionarios: number;

  @Column({ type: 'varchar', length: 255 })
  cidade: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  senha: string;

  @Column({ type: 'varchar', length: 20 })
  telefone_fixo: string;

  @Column({ type: 'varchar', length: 255 })
  sobre_empresa: string;

  @OneToMany(() => VagaEntity, (vaga) => vaga.empresa, { cascade: true, nullable: true })
  vagasAnunciadas: VagaEntity[];

  @Column({ type: 'varchar', length: 255, nullable: true, default: "" })
  linkedin: string;
}
