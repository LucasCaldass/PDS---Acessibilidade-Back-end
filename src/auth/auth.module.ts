import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationModule } from '../application/application.module';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioEntity } from '../infrastructure/data/entities/usuario.entity';
import { EmpresaEntity } from '../infrastructure/data/entities/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, EmpresaEntity]),
    ApplicationModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }]
})
export class AuthModule { }
