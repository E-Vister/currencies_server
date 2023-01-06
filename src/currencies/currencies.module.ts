import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currencies.model';
import { Convert } from '../convert/convert.model';
import { CurrencyTable } from '../table/table.model';

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forFeature([Currency, Convert, CurrencyTable]),
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
