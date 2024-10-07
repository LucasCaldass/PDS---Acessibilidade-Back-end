import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VagaEntity } from './vaga.entity';

@Entity('empresas')
export class EmpresaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255 })
  areaAtuacao: string;

  @Column({ type: 'varchar', length: 255 })
  endereco: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @OneToMany(() => VagaEntity, (vaga) => vaga.empresa, { cascade: true })
  vagasAnunciadas: VagaEntity[] = [];

  @Column({ type: 'varchar', length: 255 })
  linkedin: string;
}
