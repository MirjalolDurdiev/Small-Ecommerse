import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { BasketEntity } from './basket.entity';
import { OrderEntity } from './order.entity';
import { Roles } from 'src/common/database/enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'full_name', nullable: true })
  fullName!: string;

  @Column({
    type: 'varchar',
    name: 'role',
    nullable: true,
    default: Roles.USER,
  })
  role!: Roles;

  @Column({ type: 'varchar', name: 'username', unique: true })
  username!: string;

  @Column({ type: 'varchar', name: 'password' })
  password!: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    unique: true,
    nullable: true,
  })
  phoneNumber!: string;

  @OneToOne(() => BasketEntity, (basket) => basket.user, { cascade: true })
  basket: BasketEntity;

  @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true })
  orders: OrderEntity[];
}
