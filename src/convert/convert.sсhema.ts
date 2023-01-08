import { ApiProperty } from '@nestjs/swagger';

export class ConvertResponseSchema {
  @ApiProperty({
    example: 'BYN',
    description:
      'The three-letter currency code of the currency you convert from',
  })
  key: string;

  @ApiProperty({
    example: '5',
    description: 'The amount to be converted',
  })
  amount: number;

  @ApiProperty({
    type: 'object',
    properties: {
      to: {
        type: 'string',
        example: 'USD',
        description:
          'The three-letter currency code of the currency you convert to',
      },
      quote: {
        type: 'number',
        example: '0.395821',
        description:
          'Number of units of the currency that are equal to one unit of the base currency',
      },
      result: {
        type: 'number',
        example: '1.979105',
        description: 'Conversion result',
      },
    },
  })
  convert: object;
}
