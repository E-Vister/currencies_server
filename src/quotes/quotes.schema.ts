import { ApiProperty } from '@nestjs/swagger';

export class QuotesResponseSchema {
  @ApiProperty({
    example: '1',
    description: 'Unique id of quote',
  })
  key: number;

  @ApiProperty({
    example: 'New Belarusian Ruble',
    description: 'Full name of the quoted currency',
  })
  cname: string;

  @ApiProperty({
    example: 'BYN',
    description: 'Short code of the quoted currency',
  })
  ccode: string;

  @ApiProperty({
    example: '0.395986',
    description:
      'Number of units of the currency that are equal to one unit of the base currency',
  })
  quote: number;
}
