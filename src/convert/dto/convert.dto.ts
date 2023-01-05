import { ApiProperty } from '@nestjs/swagger';

export class ConvertDto {
  @ApiProperty({
    example: 'USD',
    required: true,
    description:
      'The three-letter currency code of the currency you would like to convert to',
  })
  readonly to: string;

  @ApiProperty({
    example: 'BYN',
    required: true,
    description:
      'The three-letter currency code of the currency you would like to convert from',
  })
  readonly from: string;

  @ApiProperty({
    example: '5',
    required: true,
    description: 'The amount to be converted',
  })
  readonly amount: number;
}
