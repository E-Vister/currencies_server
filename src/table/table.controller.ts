import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from './table.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyTable } from './table.model';

@ApiTags('Table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiOperation({ summary: 'Get currency quotes' })
  @ApiResponse({ status: 200, type: [CurrencyTable] })
  @Get(':source')
  getOne(@Param('source') source: string) {
    return this.tableService.getOne(source);
  }
}
