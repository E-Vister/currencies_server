import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currencies.model';
import { Quotes } from '../quotes/quotes.model';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Currency, Quotes])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
