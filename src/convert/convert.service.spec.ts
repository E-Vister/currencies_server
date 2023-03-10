import { Test, TestingModule } from '@nestjs/testing';
import { ConvertService } from './convert.service';
import { Currency } from '../currencies/currencies.model';
import { getModelToken } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

describe('ConvertService', () => {
  let service: ConvertService;

  const mockCurrenciesRepository = {};
  const mockQuotesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConvertService,
        {
          provide: getModelToken(Currency),
          useValue: mockCurrenciesRepository,
        },
      ],
      imports: [HttpModule],
    })
      .overrideProvider(ConvertService)
      .useValue(mockQuotesService)
      .compile();

    service = module.get<ConvertService>(ConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
