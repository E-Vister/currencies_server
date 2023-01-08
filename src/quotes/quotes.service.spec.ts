import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getModelToken } from '@nestjs/sequelize';
import { Quotes } from './quotes.model';
import { HttpModule } from '@nestjs/axios';
import { Currency } from "../currencies/currencies.model";

describe('QuotesService', () => {
  let service: QuotesService;

  const mockQuotesRepository = {};
  const mockCurrenciesRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getModelToken(Quotes),
          useValue: mockQuotesRepository,
        },
        {
          provide: getModelToken(Currency),
          useValue: mockCurrenciesRepository,
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
