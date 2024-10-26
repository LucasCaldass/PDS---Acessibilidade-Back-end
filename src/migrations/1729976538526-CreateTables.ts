import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1729976538526 implements MigrationInterface {
    name = 'CreateTables1729976538526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_genero_enum" AS ENUM('MASCULINO', 'FEMININO', 'OUTRO')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."usuarios_tipo_deficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA')
        `);
        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "senha" character varying(200) NOT NULL,
                "telefone" character varying(20) NOT NULL,
                "cidade" character varying(255) NOT NULL,
                "cargo_desejado" character varying(255) NOT NULL,
                "salario_desejado" double precision NOT NULL,
                "genero" "public"."usuarios_genero_enum" NOT NULL,
                "tipo_deficiencia" "public"."usuarios_tipo_deficiencia_enum" NOT NULL,
                "resumo_curriculo" character varying(255) NOT NULL,
                "instituicao" character varying(255) NOT NULL,
                "formacao" character varying(255) NOT NULL,
                "cursos" jsonb,
                "experiencias_profissionais" jsonb,
                "idiomas" jsonb,
                "habilidades_qualificacoes" jsonb,
                "linkedin" character varying(255) DEFAULT '',
                CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"),
                CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."candidaturas_status_enum" AS ENUM(
                'EM_ANALISE',
                'EM_PROCESSAMENTO',
                'APROVADO',
                'REPROVADO'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "candidaturas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "status" "public"."candidaturas_status_enum" NOT NULL DEFAULT 'EM_ANALISE',
                "dataCandidatura" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "vagaId" uuid,
                "usuarioId" uuid,
                CONSTRAINT "PK_524feb91642d97a6146e02c7062" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "empresas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome_empresa" character varying(255) NOT NULL,
                "cnpj" character varying(255) NOT NULL,
                "numero_funcionarios" integer NOT NULL,
                "cidade" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "senha" character varying(200) NOT NULL,
                "telefone_fixo" character varying(20) NOT NULL,
                "sobre_empresa" character varying(255) NOT NULL,
                "linkedin" character varying(255) DEFAULT '',
                CONSTRAINT "UQ_fe5e0374ec6d7d7dfbe04446903" UNIQUE ("email"),
                CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."vagas_tipodeficiencia_enum" AS ENUM('VISUAL', 'AUDITIVA', 'MOTORA')
        `);
        await queryRunner.query(`
            CREATE TABLE "vagas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "titulo" character varying(255) NOT NULL,
                "cargo" character varying(255) NOT NULL,
                "descricao" text NOT NULL,
                "salario" numeric(10, 2) NOT NULL,
                "requisitos" text NOT NULL,
                "tipoDeficiencia" "public"."vagas_tipodeficiencia_enum" NOT NULL,
                "endereco" character varying(255) NOT NULL,
                "remota" boolean NOT NULL,
                "informacoesAdicionais" text NOT NULL,
                "localizacao" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "empresaId" uuid,
                CONSTRAINT "PK_b58a2d48de86b90e87f2a324e54" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "candidaturas"
            ADD CONSTRAINT "FK_b74e588e756926be854b99f3405" FOREIGN KEY ("vagaId") REFERENCES "vagas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "candidaturas"
            ADD CONSTRAINT "FK_5e45afef39ec21fe8c44a855e84" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "candidaturas" DROP CONSTRAINT "FK_5e45afef39ec21fe8c44a855e84"
        `);
        await queryRunner.query(`
            ALTER TABLE "candidaturas" DROP CONSTRAINT "FK_b74e588e756926be854b99f3405"
        `);
        await queryRunner.query(`
            DROP TABLE "vagas"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."vagas_tipodeficiencia_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "empresas"
        `);
        await queryRunner.query(`
            DROP TABLE "candidaturas"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."candidaturas_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "usuarios"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_tipo_deficiencia_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."usuarios_genero_enum"
        `);
    }

}
