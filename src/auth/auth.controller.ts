import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputData } from './login-data.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public-routes';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({ summary: 'Realizar Login' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado'
  })
  async login(@Body() data: LoginInputData) {
    return await this.authService.signIn(data.email, data.password);
  }
}
