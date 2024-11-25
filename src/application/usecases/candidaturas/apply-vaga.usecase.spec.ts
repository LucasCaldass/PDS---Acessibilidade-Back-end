import { Test, TestingModule } from '@nestjs/testing';

import { ApplyToVagaUseCase } from './apply-vaga.usecase';
import {
  CandidaturasRepository,
  ICandidaturasRepository,
} from '../../../application/repositories/candidaturas.repository';

describe('ApplyToVagaUseCase', () => {
  let useCase: ApplyToVagaUseCase;
  let candidaturasRepository: jest.Mocked<CandidaturasRepository>;

  beforeEach(async () => {
    const mockCandidaturasRepository = {
      apply: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplyToVagaUseCase,
        {
          provide: ICandidaturasRepository,
          useValue: mockCandidaturasRepository,
        },
      ],
    }).compile();

    useCase = module.get<ApplyToVagaUseCase>(ApplyToVagaUseCase);
    candidaturasRepository = module.get<CandidaturasRepository>(
      ICandidaturasRepository,
    ) as jest.Mocked<CandidaturasRepository>;
  });

  it('should call apply method of CandidaturasRepository with correct parameters', async () => {
    const vagaId = '123';
    const usuarioId = '456';
    const applyData = { vagaId, usuarioId };

    candidaturasRepository.apply.mockResolvedValue('mocked-response');

    const result = await useCase.execute(applyData);

    expect(candidaturasRepository.apply).toHaveBeenCalledWith(applyData);
    expect(candidaturasRepository.apply).toHaveBeenCalledTimes(1);
    expect(result).toBe('mocked-response');
  });
});
