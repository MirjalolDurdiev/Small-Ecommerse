import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketEntity } from 'src/core/entity/basket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketRepository } from 'src/core/repository/basket.repository';

@Injectable()
export class BasketService extends BaseService<
  CreateBasketDto,
  UpdateBasketDto,
  BasketEntity
> {
  constructor(@InjectRepository(BasketEntity) repository: BasketRepository) {
    super(repository, 'basket');
  }
}
