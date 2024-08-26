import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum TipoDeficienciaEnum {
  VISUAL = 'VISUAL',
  AUDITIVA = 'AUDITIVA',
  MOTORA = 'MOTORA'
}

export class CreateVagaRequest {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  cargo: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  salario: number;

  @IsNotEmpty()
  @IsString()
  requisitos: string;

  @IsNotEmpty()
  @IsEnum(TipoDeficienciaEnum)
  tipoDeficiencia: TipoDeficienciaEnum;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsBoolean()
  remota: boolean;

  @IsNotEmpty()
  @IsString()
  informacoesAdicionais: string;
}
