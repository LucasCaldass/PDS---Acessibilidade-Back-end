import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVagasTable1724642896193 implements MigrationInterface {
  name = 'AddVagasTable1724642896193'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."vagas_tipodeficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA', 'MENTAL')`);
    await queryRunner.query(`CREATE TABLE "vagas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(255) NOT NULL, "cargo" character varying(255) NOT NULL, "descricao" text NOT NULL, "salario" numeric(10,2) NOT NULL, "requisitos" text NOT NULL, "tipoDeficiencia" "public"."vagas_tipodeficiencia_enum" NOT NULL, "endereco" character varying(255) NOT NULL, "remota" boolean NOT NULL, "informacoesAdicionais" text NOT NULL, "localizacao" character varying(255) NOT NULL, CONSTRAINT "PK_b58a2d48de86b90e87f2a324e54" PRIMARY KEY ("id"))`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vagas"`);
    await queryRunner.query(`DROP TYPE "public"."vagas_tipodeficiencia_enum"`);
  }
}
