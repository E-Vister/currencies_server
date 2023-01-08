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

interface QuotesCreationAttrs {
  quoteName: string;
  quote: string;
  currencyId: number;
}

@Table({ tableName: 'quotes' })
export class Quotes extends Model<Quotes, QuotesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 'USDBYN',
    description: 'Paired name of quote',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  quoteName: string;

  @ApiProperty({
    example: '0.395986',
    description:
      'Number of units of the currency that are equal to one unit of the base currency',
  })
  @Column({ type: DataType.REAL, allowNull: false, unique: false })
  quote: string;

  @ForeignKey(() => Currency)
  @Column({ type: DataType.INTEGER })
  currencyId: number;

  @BelongsTo(() => Currency)
  currency: Currency;
}
