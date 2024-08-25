import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaga } from './vagas/vaga.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VagasService } from './vagas/vagas.service';
import { VagasController } from './vagas/vagas.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pds-db',
      entities: [Vaga],
      synchronize: true, // Apenas para desenvolvimento, cria tabelas automaticamente
    }),
    TypeOrmModule.forFeature([Vaga]),
  ],
  controllers: [AppController, VagasController],
  providers: [AppService, VagasService],
})
export class AppModule {}
