import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class ConvertService {
  constructor(private readonly httpService: HttpService) {}

  convert({ to, from, amount }): any {
    const url = `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`;

    const response = this.httpService.get(url, {
      headers: {
        apikey: 'dRx2ZxSxDdUUT7fyizz4uJUHM4BimLSv',
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    });

    return response.pipe(map((res) => res.data));
  }
}
