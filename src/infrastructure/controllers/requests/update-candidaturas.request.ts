import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { StatusCandidaturaEnum } from "../../../infrastructure/data/entities/candidatura.entity";

export class UpdateCandidaturasRequest {
  @IsNotEmpty()
  @IsString()
  vagaId: string;

  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @IsNotEmpty()
  @IsEnum(StatusCandidaturaEnum)
  status: StatusCandidaturaEnum;
}
