import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationModule } from 'src/application/application.module';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioEntity } from 'src/infrastructure/data/entities/usuario.entity';
import { EmpresaEntity } from 'src/infrastructure/data/entities/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  providers: [AuthService]
})
export class AuthModule { }
