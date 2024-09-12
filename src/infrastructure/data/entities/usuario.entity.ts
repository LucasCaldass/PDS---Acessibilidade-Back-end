import { TipoDeficienciaEnum } from 'src/infrastructure/controllers/requests/create-vaga.request';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TipoGeneroEnum } from 'src/infrastructure/controllers/requests/create-usuario.request';

@Entity('usuario')
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
