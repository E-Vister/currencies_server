import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertController } from './convert.controller';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { Quotes } from '../quotes/quotes.model';
import { QuotesService } from '../quotes/quotes.service';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Currency, Quotes])],
  providers: [ConvertService, QuotesService],
  controllers: [ConvertController],
})
export class ConvertModule {}
