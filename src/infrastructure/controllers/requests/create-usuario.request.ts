import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";
import { TipoDeficienciaEnum } from '../../../infrastructure/data/entities/vaga.entity';
import { Curso, ExperienciaProfissional, Habilidades, Idioma, TipoGeneroEnum } from '../../../infrastructure/data/entities/usuario.entity';

export class CreateUsuarioRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

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
  telefone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cargo_desejado: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  salario_desejado: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TipoGeneroEnum, { message: "Genero não reconhecido" })
  genero: TipoGeneroEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TipoDeficienciaEnum, { message: "deficiencia não reconhecida!" })
  tipo_deficiencia: TipoDeficienciaEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resumo_curriculo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  instituicao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  formacao: string;

  @ApiProperty({type: [Curso]})
  cursos: Curso[];

  @ApiProperty({type: [ExperienciaProfissional]})
  experiencias_profissionais: ExperienciaProfissional[];

  @ApiProperty({type: [Idioma]})
  idiomas: Idioma[];

  @ApiProperty({type: [Habilidades]})
  habilidades_qualificacoes: Habilidades[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsUrl()
  linkedin: string;
}
