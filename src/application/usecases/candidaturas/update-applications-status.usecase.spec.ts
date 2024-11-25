import { Test, TestingModule } from '@nestjs/testing';
import { UpdateApplicationsStatusUseCase } from './update-applications-status.usecase';
import {
  CandidaturasRepository,
  ICandidaturasRepository,
} from '../../../application/repositories/candidaturas.repository';
import {
  IVagasRepository,
  VagasRepository,
} from '../../../application/repositories/vagas.repository';
import { StatusCandidaturaEnum } from '../../../infrastructure/data/entities/candidatura.entity';
import { Vaga } from '../../../domain/models/vaga.model';
import { CandidaturaResponse } from '../../../domain/models/candidatura.model';
import { TipoGeneroEnum } from '../../../infrastructure/data/entities/usuario.entity';

describe('UpdateApplicationsStatusUseCase', () => {
  let useCase: UpdateApplicationsStatusUseCase;
  let candidaturasRepository: jest.Mocked<CandidaturasRepository>;
  let vagasRepository: jest.Mocked<VagasRepository>;

  beforeEach(async () => {
    const mockCandidaturasRepository = {
      findByUserAndVagaId: jest.fn(),
      updateStatus: jest.fn(),
    };

    const mockVagasRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateApplicationsStatusUseCase,
        {
          provide: ICandidaturasRepository,
          useValue: mockCandidaturasRepository,
        },
        {
          provide: IVagasRepository,
          useValue: mockVagasRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateApplicationsStatusUseCase>(
      UpdateApplicationsStatusUseCase,
    );
    candidaturasRepository = module.get<CandidaturasRepository>(
      ICandidaturasRepository,
    ) as jest.Mocked<CandidaturasRepository>;
    vagasRepository = module.get<VagasRepository>(
      IVagasRepository,
    ) as jest.Mocked<VagasRepository>;
  });

  it('should update the status if all conditions are met', async () => {
    const input = {
      usuarioId: 'user123',
      vagaId: 'vaga123',
      status: StatusCandidaturaEnum.APROVADO,
    };

    const mockCandidatura: CandidaturaResponse = {
      id: 'candidatura123',
      usuario: {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        senha: 'hashed_password',
        telefone: '123456789',
        cidade: 'São Paulo',
        cargo_desejado: 'Desenvolvedor Backend',
        salario_desejado: 8000,
        genero: TipoGeneroEnum.MASCULINO,
        tipo_deficiencia: null,
        resumo_curriculo: 'Resumo do currículo',
        instituicao: 'Universidade XPTO',
        formacao: 'Ciência da Computação',
        cursos: [],
        experiencias_profissionais: [],
        idiomas: [],
        habilidades_qualificacoes: [],
        linkedin: 'https://linkedin.com/in/johndoe',
      },
      vaga: {
        titulo: 'Desenvolvedor Backend',
        cargo: 'Backend Developer',
        descricao: 'Vaga para desenvolvimento backend',
        salario: 8000,
        requisitos: 'Node.js, TypeScript',
        tipoDeficiencia: null,
        endereco: 'Rua ABC, 123, São Paulo',
        remota: true,
        informacoesAdicionais: 'Vaga remota disponível para todo o Brasil',
        empresa: {
          nome_empresa: 'Tech Corp',
          cnpj: '12.345.678/0001-99',
          numero_funcionarios: 100,
          cidade: 'São Paulo',
          email: 'contact@techcorp.com',
          senha: 'hashed_password',
          telefone_fixo: '1122334455',
          sobre_empresa: 'Empresa focada em tecnologia de ponta.',
          vagasAnunciadas: [],
          linkedin: 'https://linkedin.com/company/techcorp',
        },
      },
      dataCandidatura: new Date(),
      status: StatusCandidaturaEnum.EM_ANALISE,
    };

    candidaturasRepository.findByUserAndVagaId.mockResolvedValue(
      mockCandidatura,
    );

    await useCase.execute(input);

    expect(candidaturasRepository.findByUserAndVagaId).toHaveBeenCalledWith(
      input.usuarioId,
      input.vagaId,
    );
    expect(candidaturasRepository.updateStatus).toHaveBeenCalledWith(
      mockCandidatura.id,
      input.status,
    );
  });

  it('should throw an error if the candidatura does not exist', async () => {
    const input = {
      usuarioId: 'user123',
      vagaId: 'vaga123',
      status: StatusCandidaturaEnum.APROVADO,
    };

    candidaturasRepository.findByUserAndVagaId.mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow(
      `Não há registros de usuário com id [${input.usuarioId}] inscrito na vaga [${input.vagaId}]`,
    );

    expect(candidaturasRepository.findByUserAndVagaId).toHaveBeenCalledWith(
      input.usuarioId,
      input.vagaId,
    );
    expect(candidaturasRepository.updateStatus).not.toHaveBeenCalled();
  });

  it('should throw an error if the candidatura status is REPROVADO', async () => {
    const input = {
      usuarioId: 'user123',
      vagaId: 'vaga123',
      status: StatusCandidaturaEnum.APROVADO,
    };

    const mockCandidatura: CandidaturaResponse = {
      id: 'candidatura123',
      usuario: {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        senha: 'hashed_password',
        telefone: '123456789',
        cidade: 'São Paulo',
        cargo_desejado: 'Desenvolvedor Backend',
        salario_desejado: 8000,
        genero: TipoGeneroEnum.MASCULINO,
        tipo_deficiencia: null,
        resumo_curriculo: 'Resumo do currículo',
        instituicao: 'Universidade XPTO',
        formacao: 'Ciência da Computação',
        cursos: [],
        experiencias_profissionais: [],
        idiomas: [],
        habilidades_qualificacoes: [],
        linkedin: 'https://linkedin.com/in/johndoe',
      },
      vaga: {
        titulo: 'Desenvolvedor Backend',
        cargo: 'Backend Developer',
        descricao: 'Vaga para desenvolvimento backend',
        salario: 8000,
        requisitos: 'Node.js, TypeScript',
        tipoDeficiencia: null,
        endereco: 'Rua ABC, 123, São Paulo',
        remota: true,
        informacoesAdicionais: 'Vaga remota disponível para todo o Brasil',
        empresa: {
          nome_empresa: 'Tech Corp',
          cnpj: '12.345.678/0001-99',
          numero_funcionarios: 100,
          cidade: 'São Paulo',
          email: 'contact@techcorp.com',
          senha: 'hashed_password',
          telefone_fixo: '1122334455',
          sobre_empresa: 'Empresa focada em tecnologia de ponta.',
          vagasAnunciadas: [],
          linkedin: 'https://linkedin.com/company/techcorp',
        },
      },
      dataCandidatura: new Date(),
      status: StatusCandidaturaEnum.REPROVADO,
    };

    candidaturasRepository.findByUserAndVagaId.mockResolvedValue(
      mockCandidatura,
    );

    await expect(useCase.execute(input)).rejects.toThrow(
      'Candidatura não pode mais ser atualizada',
    );

    expect(candidaturasRepository.findByUserAndVagaId).toHaveBeenCalledWith(
      input.usuarioId,
      input.vagaId,
    );
    expect(candidaturasRepository.updateStatus).not.toHaveBeenCalled();
  });
});
