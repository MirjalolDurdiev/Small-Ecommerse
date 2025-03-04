import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', unique: true })
  name!: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description!: string;

  @Column({ type: 'varchar', name: 'image', nullable: true })
  image!: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}
