import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Currency } from './currencies.model';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @ApiOperation({ summary: 'Get currencies list' })
  @ApiResponse({ status: 200, type: [Currency] })
  @Get()
  getAll(): any {
    return this.currenciesService.getAll();
  }
}
