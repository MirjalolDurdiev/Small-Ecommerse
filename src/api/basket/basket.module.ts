import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from 'src/core/entity/basket.entity';
import { BasketController } from './basket.controller';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity]), AuthModule],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
