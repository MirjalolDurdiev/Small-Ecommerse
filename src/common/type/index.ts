import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export type ID = number;
export class ObjDto {
  @ApiProperty({
    type: Number,
    description: 'id',
  })
  @IsNotEmpty()
  @IsInt()
  id!: ID;
}
