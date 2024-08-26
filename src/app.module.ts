import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { VagaEntity } from './infrastructure/data/entities/vaga.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    DomainModule,
    ApplicationModule
  ],
  providers: [],
})
export class AppModule { }
