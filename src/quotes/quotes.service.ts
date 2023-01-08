import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { Quotes } from './quotes.model';
import { ConvertDto } from '../convert/dto/convert.dto';

@Injectable()
export class QuotesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Quotes)
    private quotesRepository: typeof Quotes,
    @InjectModel(Currency) private currenciesRepository: typeof Currency,
  ) {}

  async getOne(source: string): Promise<any> {
    const currency = await this.currenciesRepository.findOne({
      where: { code: source },
      include: { all: true },
    });

    if (currency.quotes.length !== 0) {
      const currenciesNames = (
        await this.currenciesRepository.findAll({
          attributes: ['name'],
        })
      ).map((i) => i.name);

      return currency.quotes.map((item, index) => {
        return {
          key: index + 1,
          cname: currenciesNames[index],
          ccode: item.quoteName.slice(3),
          quote: item.quote,
        };
      });
    } else {
      return await this.cacheTable(source);
    }
  }

  async cacheTable(
    source: string,
    convert = false,
    dto: ConvertDto = null,
  ): Promise<any> {
    const date = new Date().toISOString().split('T')[0];
    const currencies = (
      await this.currenciesRepository.findAll({ attributes: ['code'] })
    ).map((i) => i.code);

    const url = `https://api.apilayer.com/currency_data/change?source=${source}&currencies=${currencies}&start_date=${date}&end_date=${date}`;

    const response = this.httpService.get(url, {
      headers: {
        apikey: 'AJyb462UxOpu7wz9HxPwamJE2I2MzepB',
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    });

    return response.pipe(
      map(async (res) => {
        const currencyId = await this.currenciesRepository
          .findOne({
            where: { code: res.data.source },
          })
          .then((currency) => currency.id);

        const quotes = Object.entries(res.data.quotes).map((i) => {
          return {
            quoteName: i[0],
            quote: i[1]['start_rate'],
            currencyId,
          };
        });

        const createdQuotes = await this.quotesRepository.bulkCreate(quotes, {
          ignoreDuplicates: true,
        });

        if (convert) {
          const [{ quoteName, quote }] = createdQuotes.filter(
            (i) => i.quoteName === `${dto.from}${dto.to}`,
          );

          return {
            key: dto.from,
            amount: dto.amount,
            convert: {
              to: quoteName.slice(3),
              quote,
              result: dto.amount * Number(quote),
            },
          };
        } else {
          return await this.getOne(source);
        }
      }),
    );
  }
}
