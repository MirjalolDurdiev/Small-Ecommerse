import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  UserEntity
> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository, 'User');
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { username } });
  }
}
