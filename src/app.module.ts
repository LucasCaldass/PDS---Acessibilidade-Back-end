import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { VagaEntity } from './infrastructure/data/entities/vaga.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: parseInt(process.env.DB_PORT, 10),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      entities: [VagaEntity],
      synchronize: false,
      migrations: ['src/migrations/**/*.ts'],
      logging: true,
    }),
    DomainModule,
    ApplicationModule
  ],
  providers: [],
})
export class AppModule { }
