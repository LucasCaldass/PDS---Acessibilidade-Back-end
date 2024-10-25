import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateEmpresaRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome_empresa: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @IsNumber()
  numero_funcionarios: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefone_fixo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sobre_empresa: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  vagasAnunciadas?: any[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @IsOptional()
  linkedin?: string;
}
