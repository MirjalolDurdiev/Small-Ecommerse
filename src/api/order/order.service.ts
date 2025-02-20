import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from 'src/core/entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/core/repository/order.repository';

@Injectable()
export class OrderService extends BaseService<
  CreateOrderDto,
  UpdateOrderDto,
  OrderEntity
> {
  constructor(@InjectRepository(OrderEntity) repository: OrderRepository) {
    super(repository, 'order');
  }
}
