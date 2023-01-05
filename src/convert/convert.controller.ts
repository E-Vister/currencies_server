import { Controller, Post, Body } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertDto } from './dto/convert.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Convert, ConvertResponse } from './convert.model';

@ApiTags('Convert')
@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @ApiOperation({ summary: 'Convert one currency to another' })
  @ApiResponse({ status: 200, type: [ConvertResponse] })
  @Post()
  convert(@Body() convertDto: ConvertDto) {
    return this.convertService.convert(convertDto);
  }
}
