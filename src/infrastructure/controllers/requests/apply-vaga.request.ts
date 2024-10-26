import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ApplyVagaRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vagaId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuarioId: string;
}
