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
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RolesDecorator } from '../auth/decorator';
import { Roles } from 'src/common/database/enum';

@Controller('basket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@RolesDecorator(Roles.USER)
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.create(createBasketDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.basketService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketService.update(id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.basketService.remove(id);
  }
}
