import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsuariosRepository, UsuariosRepository } from '../application/repositories/usuario.repository';
import { EmpresasRepository, IEmpresasRepository } from '../application/repositories/empresas.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';

export type AuthResponse = {
  token: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUsuariosRepository) private readonly usuariosRepository: UsuariosRepository,
    @Inject(IEmpresasRepository) private readonly empresasRepository: EmpresasRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const user = await this.usuariosRepository.findByEmail(email);
    const empresa = await this.empresasRepository.findByEmail(email);

    if (user && this.isPasswordValid(password, user.senha)) {
      return this.generateToken(user.id, Role.CANDIDATO)
    } else if (empresa && this.isPasswordValid(password, empresa.senha)) {
      return this.generateToken(empresa.id, Role.EMPRESA);
    }

    throw new UnauthorizedException();
  }

  private async generateToken(id: string, role: string): Promise<AuthResponse> {
    const payload = { id, role };
    return {
      token: await this.jwtService.signAsync(payload),
      role
    }
  }

  private async isPasswordValid(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

