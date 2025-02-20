import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from 'src/core/entity/product.entity';
import { ProductRepository } from 'src/core/repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends BaseService<
  CreateProductDto,
  UpdateProductDto,
  ProductEntity
> {
  constructor(@InjectRepository(ProductEntity) repository: ProductRepository) {
    super(repository, 'product');
  }
}
