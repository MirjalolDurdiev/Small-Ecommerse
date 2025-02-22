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
    try {
      const entity = this.repository.create(CreateDto);
      const savedEntity = await this.repository.save(entity);
      return {
        data: savedEntity,
        status: 201,
        message: `${this.entityName} created successfully`,
      };
    } catch (error) {
      console.error(`Failed to create ${this.entityName}: ${error.message}`);
      return {
        data: null,
        status: 500,
        message: `Failed to create ${this.entityName}: ${error.message}`,
      };
    }
  }

  async findAll(): Promise<IResponse<Entity[]>> {
    try {
      const data = await this.repository.find();
      return {
        data: data,
        status: 200,
        message: `List of ${this.entityName}`,
      };
    } catch (error) {
      console.error(`Error fetching ${this.entityName} list:`, error);
      return {
        data: [],
        status: 500,
        message: `Failed to fetch ${this.entityName} list: ${error.message}`,
      };
    }
  }

  async findOne(id: number): Promise<IResponse<Entity>> {
    try {
      const entity = await this.repository.findOne({ where: { id } });
      if (!entity) {
        throw new NotFoundException(
          `${this.entityName} with ID ${id} not found`,
        );
      }
      return {
        data: entity,
        status: 200,
        message: `${this.entityName} found`,
      };
    } catch (error) {
      console.error(`Error fetching ${this.entityName} with ID ${id}:`, error);
      return {
        data: null,
        status: error instanceof NotFoundException ? 404 : 500,
        message: error.message || `Failed to fetch ${this.entityName}`,
      };
    }
  }

  async remove(id: number): Promise<IResponse<Entity>> {
    try {
      const { data: entity } = await this.findOne(id);
      await this.repository.remove(entity);

      return {
        data: entity,
        status: 200,
        message: `${this.entityName} deleted successfully`,
      };
    } catch (error) {
      console.error(`Error deleting ${this.entityName} with ID ${id}:`, error);
      return {
        data: null,
        status: error instanceof NotFoundException ? 404 : 500,
        message: error.message || `Failed to delete ${this.entityName}`,
      };
    }
  }

  async update(id: number, updateDto: UpdateDto): Promise<IResponse<Entity>> {
    try {
      const entity = await this.repository.findOne({ where: { id } });
      if (!entity) {
        throw new NotFoundException(
          `${this.entityName} with ID ${id} not found`,
        );
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
    } catch (error) {
      console.error(`Error updating ${this.entityName} with ID ${id}:`, error);
      return {
        data: null,
        status: error instanceof NotFoundException ? 404 : 500,
        message: error.message || `Failed to update ${this.entityName}`,
      };
    }
  }
}
