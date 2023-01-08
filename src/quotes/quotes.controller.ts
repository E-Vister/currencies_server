import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { QuotesResponseSchema } from './quotes.schema';

@ApiTags('Table')
@Controller('table')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @ApiOperation({ summary: 'Get currency quotes' })
  @ApiResponse({ status: 200, type: [QuotesResponseSchema] })
  @Get(':source')
  getOne(@Param('source') source: string) {
    return this.quotesService.getOne(source);
  }
}
