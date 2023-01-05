import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../currencies/currencies.model';

interface ConvertCreationAttrs {
  to: string;
  quote: number;
  currencyId: number;
}

@Table({ tableName: 'convert' })
export class Convert extends Model<Convert, ConvertCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 'USD',
    description: 'Currency code',
    name: 'key',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  to: string;

  @ApiProperty({
    example: '0.395986',
    description: 'The price of one currency expressed in another',
  })
  @Column({ type: DataType.REAL, allowNull: false })
  quote: string;

  @ForeignKey(() => Currency)
  @Column({ type: DataType.INTEGER })
  currencyId: number;

  @ApiProperty({ type: Currency })
  @BelongsTo(() => Currency)
  currency: Currency;
}

class ConvertResult {
  @ApiProperty({
    example: 'USD',
    description:
      'The three-letter currency code of the currency you would like to convert to',
  })
  to: string;

  @ApiProperty({
    example: '0.395986',
    description:
      'Number of units of the currency that are equal to one unit of the base currency',
  })
  quote: number;

  @ApiProperty({
    example: '1.97993',
    description: 'Conversion result',
  })
  result: number;
}

export class ConvertResponse {
  @ApiProperty({
    example: 'BYN',
    description:
      'The three-letter currency code of the currency you would like to convert from',
  })
  key: string;

  @ApiProperty({ example: '5', description: 'The amount to be converted' })
  amount: number;

  @ApiProperty({ type: ConvertResult })
  convert: ConvertResult;
}
