import { Entity, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { CategoryEntity } from './category.entity';
import { BasketEntity } from './basket.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name' })
  name!: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description!: string;

  @Column({ type: 'decimal', name: 'price' })
  price!: number;

  @Column({ type: 'int', name: 'stock' })
  stock!: number;

  @Column({ type: 'varchar', name: 'image', nullable: true })
  image!: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity;

  @ManyToMany(() => BasketEntity, (basket) => basket.products)
  baskets!: BasketEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders!: OrderEntity[];
}
