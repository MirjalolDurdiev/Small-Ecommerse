import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/lib/baseService/baseService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { UserRepository } from 'src/core/repository/user.repository';

@Injectable()
export class UserService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  UserEntity
> {
  constructor(@InjectRepository(UserEntity) repository: UserRepository) {
    super(repository, 'User');
  }

  async findById(id: number) {
    return this.getRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.getRepository.findOne({ where: { username } });
  }
}
