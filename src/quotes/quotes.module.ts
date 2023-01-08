import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { Quotes } from './quotes.model';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Currency, Quotes])],
  providers: [QuotesService],
  controllers: [QuotesController],
})
export class QuotesModule {}
