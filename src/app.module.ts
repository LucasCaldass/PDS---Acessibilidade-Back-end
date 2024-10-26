import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/ormconfig';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './auth/auth.module';

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
    ApplicationModule,
    InfrastructureModule,
    AuthModule
  ],
  providers: [],
})
export class AppModule { }
