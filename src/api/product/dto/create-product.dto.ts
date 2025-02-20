import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjDto } from 'src/common/type';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  Image!: string;

  @ApiProperty({ type: () => ObjDto })
  @IsNotEmpty()
  @Type(() => ObjDto)
  @ValidateNested()
  category!: ObjDto;
}
