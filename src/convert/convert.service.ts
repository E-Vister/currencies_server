import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { ConvertDto } from './dto/convert.dto';
import { QuotesService } from '../quotes/quotes.service';

@Injectable()
export class ConvertService {
  constructor(
    private readonly httpService: HttpService,
    private readonly quotesService: QuotesService,
    @InjectModel(Currency) private currenciesRepository: typeof Currency,
  ) {}

  async convert(dto: ConvertDto): Promise<any> {
    const currency = await this.currenciesRepository.findOne({
      where: { code: dto.from },
      include: { all: true },
    });

    if (currency.quotes.length !== 0) {
      return this.packConvertResponse(currency.quotes, dto);
    } else {
      return await this.quotesService.cacheTable(dto.from, true, dto);
    }
  }

  async packConvertResponse(quotes, dto: ConvertDto): Promise<any> {
    const [{ quoteName, quote }] = quotes.filter(
      (i) => i.quoteName === `${dto.from}${dto.to}`,
    );

    return {
      key: dto.from,
      amount: dto.amount,
      convert: {
        to: quoteName.slice(3),
        quote,
        result: Math.round(dto.amount * quote * 100) / 100,
      },
    };
  }
}
