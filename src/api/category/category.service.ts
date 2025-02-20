import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from 'src/core/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/core/repository/category.repository';

@Injectable()
export class CategoryService extends BaseService<
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryEntity
> {
  constructor(
    @InjectRepository(CategoryEntity) repository: CategoryRepository,
  ) {
    super(repository, 'category');
  }
}
