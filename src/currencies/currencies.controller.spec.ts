import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesController', () => {
  let controller: CurrenciesController;

  const mockCurrenciesService = {
    getAll: jest.fn(() => {
      return [
        {
          key: 'USD',
          label: 'United States Dollar',
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [CurrenciesService],
    })
      .overrideProvider(CurrenciesService)
      .useValue(mockCurrenciesService)
      .compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a currencies', () => {
    expect(controller.getAll()).toEqual([
      {
        key: 'USD',
        label: 'United States Dollar',
      },
    ]);
  });
});
