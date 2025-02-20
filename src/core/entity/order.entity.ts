import {
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Column,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';
import { OrderStatus } from 'src/common/database/enum';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  @JoinTable({ name: 'order_products' })
  products!: ProductEntity[];

  @Column({ type: 'int', name: 'quantity' })
  quantity!: number;

  @Column({ type: 'varchar', name: 'status', default: 'pending' })
  status!: OrderStatus;
}
