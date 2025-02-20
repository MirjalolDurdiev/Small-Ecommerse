import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjDto } from 'src/common/type';

export class CreateBasketDto {
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
}
