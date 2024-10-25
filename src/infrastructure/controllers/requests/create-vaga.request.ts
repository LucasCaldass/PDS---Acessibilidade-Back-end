import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { TipoDeficienciaEnum } from '../../../infrastructure/data/entities/vaga.entity';
import { Empresa } from 'src/domain/models/empresa.model';

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

  @ApiProperty()
  @IsUUID()
  empresa: Empresa;
}
