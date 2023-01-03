import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConvertModule } from './convert/convert.module';

@Module({
  imports: [HttpModule, ConvertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
