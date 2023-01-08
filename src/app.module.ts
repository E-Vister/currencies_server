import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConvertModule } from './convert/convert.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesModule } from './currencies/currencies.module';
import { Currency } from './currencies/currencies.model';
import { QuotesModule } from './quotes/quotes.module';
import { Quotes } from './quotes/quotes.model';

@Module({
  imports: [
    HttpModule,
    ConvertModule,
    CurrenciesModule,
    QuotesModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Currency, Quotes],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
