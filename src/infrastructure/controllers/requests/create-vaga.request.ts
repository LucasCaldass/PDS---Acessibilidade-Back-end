import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum TipoDeficienciaEnum {
  VISUAL = 'VISUAL',
  AUDITIVA = 'AUDITIVA',
  MOTORA = 'MOTORA',
  MENTAL = 'MENTAL'
}

export class CreateVagaRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cargo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  salario: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  requisitos: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TipoDeficienciaEnum)
  tipoDeficiencia: TipoDeficienciaEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endereco: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  remota: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  informacoesAdicionais: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  localizacao: string;
}
