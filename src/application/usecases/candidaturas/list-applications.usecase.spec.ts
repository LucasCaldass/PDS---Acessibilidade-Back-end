import { Test, TestingModule } from '@nestjs/testing';

import { ListApplicationsUseCase } from './list-applications.usecase';
import {
  CandidaturasRepository,
  ICandidaturasRepository,
} from '../../../application/repositories/candidaturas.repository';

describe('ListApplicationsUseCase', () => {
  let useCase: ListApplicationsUseCase;
  let candidaturasRepository: jest.Mocked<CandidaturasRepository>;

  beforeEach(async () => {
    const mockCandidaturasRepository = {
      findAllByUserId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListApplicationsUseCase,
        {
          provide: ICandidaturasRepository,
          useValue: mockCandidaturasRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListApplicationsUseCase>(ListApplicationsUseCase);
    candidaturasRepository = module.get<CandidaturasRepository>(
      ICandidaturasRepository,
    ) as jest.Mocked<CandidaturasRepository>;
  });

  it('should call findAllByUserId method of CandidaturasRepository with the correct userId', async () => {
    const userId = '456';
    const mockApplications = [
      { id: '1', vagaId: '123', status: 'pending' },
      { id: '2', vagaId: '124', status: 'approved' },
    ];

    candidaturasRepository.findAllByUserId.mockResolvedValue(mockApplications);

    const result = await useCase.execute(userId);

    expect(candidaturasRepository.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(candidaturasRepository.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockApplications);
  });
});
