import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Currency } from './currencies.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Currency) private currenciesRepository: typeof Currency,
  ) {}

  async getAll(): Promise<any> {
    const currencies = await this.currenciesRepository.findAll();

    if (currencies.length !== 0) {
      return Array.from(currencies).map((i) => ({
        key: i.code,
        label: i.name,
      }));
    } else {
      return await this.cacheCurrencies();
    }
  }

  async cacheCurrencies(): Promise<any> {
    const url = `https://api.apilayer.com/currency_data/list`;

    const response = this.httpService.get(url, {
      headers: {
        apikey: 'AJyb462UxOpu7wz9HxPwamJE2I2MzepB',
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    });

    return response.pipe(
      map(async (res) => {
        const currencies = Object.entries(res.data['currencies'])
          .map((i) => ({
            code: i[0] as string,
            name: i[1] as string,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        const createdCurrencies = await this.currenciesRepository.bulkCreate(
          currencies,
          {
            ignoreDuplicates: true,
          },
        );

        return Array.from(createdCurrencies)
          .map((i) => ({
            key: i.code,
            label: i.name,
          }))
          .slice(0, -1);
      }),
    );
  }
}
