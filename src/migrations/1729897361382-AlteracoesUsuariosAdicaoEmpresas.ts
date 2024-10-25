import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteracoesUsuariosAdicaoEmpresas1729897361382 implements MigrationInterface {
    name = 'AlteracoesUsuariosAdicaoEmpresas1729897361382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "empresas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome_empresa" character varying(255) NOT NULL,
                "cnpj" character varying(255) NOT NULL,
                "numero_funcionarios" integer NOT NULL,
                "cidade" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "senha" character varying(20) NOT NULL,
                "telefone_fixo" character varying(20) NOT NULL,
                "sobre_empresa" character varying(255) NOT NULL,
                "linkedin" character varying(255) DEFAULT '',
                CONSTRAINT "UQ_fe5e0374ec6d7d7dfbe04446903" UNIQUE ("email"),
                CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "idade"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "endereco"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "tipoDeficiencia"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_tipodeficiencia_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "cargosPretendidos"
        `);
        await queryRunner.query(`
            ALTER TABLE "vagas"
            ADD "empresaId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "email" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "senha" character varying(20) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "cidade" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "cargo_desejado" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "salario_desejado" double precision NOT NULL
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_tipo_deficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA')
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "tipo_deficiencia" "public"."usuarios_tipo_deficiencia_enum" NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "resumo_curriculo" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "instituicao" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "formacao" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "cursos" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "experiencias_profissionais" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "idiomas" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "habilidades_qualificacoes" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ALTER COLUMN "linkedin" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ALTER COLUMN "linkedin"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "vagas"
            ADD CONSTRAINT "FK_61e2c2c348c984194644c17d5ab" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vagas" DROP CONSTRAINT "FK_61e2c2c348c984194644c17d5ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ALTER COLUMN "linkedin" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ALTER COLUMN "linkedin"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "habilidades_qualificacoes"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "idiomas"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "experiencias_profissionais"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "cursos"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "formacao"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "instituicao"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "resumo_curriculo"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "tipo_deficiencia"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_tipo_deficiencia_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "salario_desejado"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "cargo_desejado"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "cidade"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "senha"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "vagas" DROP COLUMN "empresaId"
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "cargosPretendidos" character varying(255) array NOT NULL
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_tipodeficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA')
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "tipoDeficiencia" "public"."usuarios_tipodeficiencia_enum" array NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "endereco" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "usuarios"
            ADD "idade" integer NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "empresas"
        `);
    }

}
