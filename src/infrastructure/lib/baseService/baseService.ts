import { Repository } from 'typeorm';
import { IResponse } from './interface';
import { NotFoundException } from '@nestjs/common';

export class BaseService<CreateDto, UpdateDto, Entity> {
  constructor(
    protected repository: Repository<any>,
    private readonly entityName: string,
  ) {}

  get getRepository() {
    return this.repository;
  }

  async create(CreateDto: CreateDto): Promise<IResponse<Entity>> {
    const entity = this.repository.create(CreateDto);
    const savedEntity = await this.repository.save(entity);
    return {
      data: savedEntity,
      status: 201,
      message: `${this.entityName} created successfully`,
    };
  }

  async findAll(): Promise<IResponse<Entity[]>> {
    const data = await this.repository.find();
    return {
      data: data,
      status: 201,
      message: `List of ${this.entityName} `,
    };
  }
  async findOne(id: number): Promise<IResponse<Entity>> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
    return {
      data: entity,
      status: 200,
      message: `${this.entityName} found`,
    };
  }
  async remove(id: number): Promise<IResponse<Entity>> {
    const { data: entity } = await this.findOne(id);
    await this.repository.remove(entity);

    return {
      data: entity,
      status: 200,
      message: `${this.entityName} deleted successfully`,
    } as IResponse<Entity>;
  }
  async update(id: number, updateDto: UpdateDto): Promise<IResponse<Entity>> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }

    const updatedEntity = await this.repository.save({
      ...entity,
      ...updateDto,
    });

    return {
      data: updatedEntity,
      status: 200,
      message: `${this.entityName} updated successfully`,
    };
  }
}
