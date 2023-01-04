import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CurrencyCreationAttrs {
  code: string;
  name: string;
}

@Table({ tableName: 'currencies' })
export class Currencies extends Model<Currencies, CurrencyCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;
}
