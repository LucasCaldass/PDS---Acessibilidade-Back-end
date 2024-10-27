import { Curso, ExperienciaProfissional, Habilidades, Idioma, TipoGeneroEnum } from "../../infrastructure/data/entities/usuario.entity";
import { TipoDeficienciaEnum } from "../../infrastructure/data/entities/vaga.entity";

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cidade: string;
  cargo_desejado: string;
  salario_desejado: number;
  genero: TipoGeneroEnum;
  tipo_deficiencia: TipoDeficienciaEnum;
  resumo_curriculo: string;
  instituicao: string;
  formacao: string;
  cursos: Curso[];
  experiencias_profissionais: ExperienciaProfissional[];
  idiomas: Idioma[];
  habilidades_qualificacoes: Habilidades[];
  linkedin?: string;
}

export type UsuarioResponse = Usuario & {
  id: string;
}
