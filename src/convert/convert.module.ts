import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertController } from './convert.controller';
import { HttpModule } from '@nestjs/axios';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from '../currencies/currencies.model';
import { Convert } from './convert.model';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([Currency, Convert])],
  providers: [ConvertService],
  controllers: [ConvertController],
})
export class ConvertModule {}
