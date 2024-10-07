import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateEmpresaRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  areaAtuacao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endereco: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  vagasAnunciadas?: any[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  linkedin: string;
}
