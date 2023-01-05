import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Convert } from '../convert/convert.model';

interface CurrencyCreationAttrs {
  code: string;
  name: string;
}

@Table({ tableName: 'currencies' })
export class Currency extends Model<Currency, CurrencyCreationAttrs> {
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
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code: string;

  @ApiProperty({
    example: 'United States Dollar',
    description: 'Currency name',
    name: 'label',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Convert)
  convert: Convert[];
}
