import {
  Entity,
  OneToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Column,
} from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'baskets' })
export class BasketEntity extends BaseEntity {
  @OneToOne(() => UserEntity, (user) => user.basket, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.baskets)
  @JoinTable({ name: 'basket_products' })
  @JoinColumn({ name: 'user_id' })
  products!: ProductEntity[];

  @Column({ type: 'int', name: 'quanity' })
  quantity!: number;
}
