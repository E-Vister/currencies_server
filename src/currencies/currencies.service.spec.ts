import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService } from './currencies.service';
import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/sequelize';
import { Currency } from './currencies.model';

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  const mockCurrenciesRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: getModelToken(Currency),
          useValue: mockCurrenciesRepository,
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
