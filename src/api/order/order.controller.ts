import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { RolesDecorator } from '../auth/decorator';
import { Roles } from 'src/common/database/enum';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @RolesDecorator(Roles.USER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
  @RolesDecorator(Roles.ADMIN)
  @Get()
  findAll(@Req() req: Request) {
    return this.orderService.findAll();
  }
  @RolesDecorator(Roles.USER)
  @Get(':id')
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }
  @RolesDecorator(Roles.USER, Roles.ADMIN)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
