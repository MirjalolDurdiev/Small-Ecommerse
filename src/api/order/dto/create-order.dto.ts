import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { OrderStatus } from 'src/common/database/enum';
import { ObjDto } from 'src/common/type';

export class CreateOrderDto {
  @ApiProperty({ type: () => ObjDto })
  @IsNotEmpty()
  @Type(() => ObjDto)
  @ValidateNested()
  user!: ObjDto;

  @ApiProperty({ type: () => ObjDto })
  @IsNotEmpty()
  @Type(() => ObjDto)
  @ValidateNested()
  product!: ObjDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity!: number;

  @ApiProperty({ enum: OrderStatus })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
