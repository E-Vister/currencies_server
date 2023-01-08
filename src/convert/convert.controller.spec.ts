import { Test, TestingModule } from '@nestjs/testing';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import { ConvertDto } from './dto/convert.dto';

describe('ConvertController', () => {
  let controller: ConvertController;

  const mockConvertService = {
    convert: jest.fn((dto) => {
      return {
        key: dto.from,
        amount: dto.amount,
        convert: {
          to: dto.to,
          quote: 0.395821,
          result: dto.amount * 0.395821,
        },
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvertController],
      providers: [ConvertService],
    })
      .overrideProvider(ConvertService)
      .useValue(mockConvertService)
      .compile();

    controller = module.get<ConvertController>(ConvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should convert a currency', () => {
    const dto: ConvertDto = {
      from: 'USD',
      to: 'BYN',
      amount: 5,
    };

    expect(controller.convert(dto)).toEqual({
      key: 'USD',
      amount: 5,
      convert: {
        to: 'BYN',
        quote: 0.395821,
        result: 1.979105,
      },
    });

    expect(mockConvertService.convert).toHaveBeenCalledWith(dto);
  });
});
