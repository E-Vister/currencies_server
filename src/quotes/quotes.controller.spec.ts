import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

describe('QuotesController', () => {
  let controller: QuotesController;

  const mockQuotesService = {
    getOne: jest.fn((source) => {
      return [
        {
          key: 1,
          cname: 'Afghan Afghani',
          ccode: 'AFN',
          quote: 88.50399,
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [QuotesService],
    })
      .overrideProvider(QuotesService)
      .useValue(mockQuotesService)
      .compile();

    controller = module.get<QuotesController>(QuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all quotes of one currency', () => {
    const params = {
      source: 'USD',
    };

    expect(controller.getOne(params.source)).toEqual([
      {
        key: 1,
        cname: 'Afghan Afghani',
        ccode: 'AFN',
        quote: 88.50399,
      },
    ]);

    expect(mockQuotesService.getOne).toHaveBeenCalledWith(params.source);
  });
});
