import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserRole } from 'src/utils/enums';

@Table({
  tableName: 'Users',
  freezeTableName: true,
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  refreshToken: string;
}
