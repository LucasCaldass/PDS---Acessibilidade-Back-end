import { Test, TestingModule } from '@nestjs/testing';

import { ListApplicantsUseCase } from './list-applicants.usecase';
import {
  CandidaturasRepository,
  ICandidaturasRepository,
} from '../../../application/repositories/candidaturas.repository';

describe('ListApplicantsUseCase', () => {
  let useCase: ListApplicantsUseCase;
  let candidaturasRepository: jest.Mocked<CandidaturasRepository>;

  beforeEach(async () => {
    const mockCandidaturasRepository = {
      findUsersByVagaId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListApplicantsUseCase,
        {
          provide: ICandidaturasRepository,
          useValue: mockCandidaturasRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListApplicantsUseCase>(ListApplicantsUseCase);
    candidaturasRepository = module.get<CandidaturasRepository>(
      ICandidaturasRepository,
    ) as jest.Mocked<CandidaturasRepository>;
  });

  it('should call findUsersByVagaId method of CandidaturasRepository with the correct vagaId', async () => {
    const vagaId = '123';
    const mockUsers = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' },
    ];

    candidaturasRepository.findUsersByVagaId.mockResolvedValue(mockUsers);

    const result = await useCase.execute(vagaId);

    expect(candidaturasRepository.findUsersByVagaId).toHaveBeenCalledWith(
      vagaId,
    );
    expect(candidaturasRepository.findUsersByVagaId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });
});
