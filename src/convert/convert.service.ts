import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { Convert } from './convert.model';
import { CreateConvertDto } from './dto/create-convert.dto';
import { Currency } from '../currencies/currencies.model';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class ConvertService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Convert) private convertRepository: typeof Convert,
    @InjectModel(Currency) private currenciesRepository: typeof Currency,
  ) {}

  async convert(dto: ConvertDto): Promise<any> {
    const currency = await this.currenciesRepository.findOne({
      where: { code: dto.from },
      include: { all: true },
    });

    if (currency.convert.filter((i) => i.to === dto.to).length !== 0) {
      return this.packConvertResponse(currency, dto);
    } else {
      return await this.cacheConvert(dto);
    }
  }

  async cacheConvert({ to, from, amount }): Promise<any> {
    const url = `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=1`;

    const response = this.httpService.get(url, {
      headers: {
        apikey: 'AJyb462UxOpu7wz9HxPwamJE2I2MzepB',
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    });

    return response.pipe(
      map(async (res) => {
        const to = res.data.query.to;
        const quote = res.data.info.quote.toFixed(6);
        const currencyId = await this.currenciesRepository
          .findOne({
            where: { code: res.data.query.from },
          })
          .then((currency) => currency.id);

        await this.create({ to, quote, currencyId });

        const currency = await this.currenciesRepository.findOne({
          where: { code: from },
          include: { all: true },
        });

        return await this.packConvertResponse(currency, { to, from, amount });
      }),
    );
  }

  async create(dto: CreateConvertDto): Promise<any> {
    return await this.convertRepository.create(dto);
  }

  async packConvertResponse(currency, dto: ConvertDto): Promise<any> {
    const [{ to, quote }] = currency.convert.filter((i) => i.to === dto.to);

    return {
      key: currency.code,
      amount: dto.amount,
      convert: {
        to,
        quote,
        result: dto.amount * quote,
      },
    };
  }
}
