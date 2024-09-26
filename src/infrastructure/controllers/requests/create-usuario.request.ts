import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";
import { TipoDeficienciaEnum } from '../../../infrastructure/data/entities/vaga.entity';
import { TipoGeneroEnum } from '../../../infrastructure/data/entities/usuario.entity';

export class CreateUsuarioRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  idade: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TipoGeneroEnum, { message: "Genero não reconhecido" })
  genero: TipoGeneroEnum;

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
  @ArrayNotEmpty()
  @IsEnum(TipoDeficienciaEnum, { each: true, message: "deficiencia não reconhecida!" })
  tipoDeficiencia: TipoDeficienciaEnum[];

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  cargosPretendidos: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  linkedin: string;
}
