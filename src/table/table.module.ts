import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { CurrencyTable } from './table.model';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Currency, CurrencyTable])],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
