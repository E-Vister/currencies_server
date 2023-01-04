import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { Currencies } from './currencies.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CurrenciesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Currencies) private currenciesRepository: typeof Currencies,
  ) {}

  async getAll(): Promise<any> {
    const currencies = await this.currenciesRepository.findAll();

    if (currencies.length !== 0) {
      return currencies;
    } else {
      return await this.cacheCurrencies();
    }
  }

  async cacheCurrencies(): Promise<any> {
    const url = `https://api.apilayer.com/currency_data/list`;

    const response = this.httpService.get(url, {
      headers: {
        apikey: 'dRx2ZxSxDdUUT7fyizz4uJUHM4BimLSv',
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    });

    return response.pipe(
      map(async (res) => {
        const currencies = Object.entries(res.data['currencies']).map((i) => ({
          code: i[0] as string,
          name: i[1] as string,
        }));

        return await this.currenciesRepository.bulkCreate(currencies, {
          ignoreDuplicates: true,
        });
      }),
    );
  }
}
