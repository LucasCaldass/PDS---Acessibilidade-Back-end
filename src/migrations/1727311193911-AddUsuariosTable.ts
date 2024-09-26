import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsuariosTable1727311193911 implements MigrationInterface {
    name = 'AddUsuariosTable1727311193911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_genero_enum" AS ENUM('MASCULINO', 'FEMININO', 'OUTRO')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_tipodeficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA')
        `);
        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(255) NOT NULL,
                "idade" integer NOT NULL,
                "genero" "public"."usuarios_genero_enum" NOT NULL,
                "endereco" character varying(255) NOT NULL,
                "telefone" character varying(20) NOT NULL,
                "tipoDeficiencia" "public"."usuarios_tipodeficiencia_enum" array NOT NULL,
                "cargosPretendidos" character varying(255) array NOT NULL,
                "linkedin" character varying(255) NOT NULL,
                CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "usuarios"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_tipodeficiencia_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_genero_enum"
        `);
    }

}
