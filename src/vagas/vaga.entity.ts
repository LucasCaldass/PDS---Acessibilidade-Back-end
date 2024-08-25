import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vaga {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  salario: number;

  @Column()
  localizacao: string;
}
