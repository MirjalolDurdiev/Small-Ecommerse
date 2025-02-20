import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/db.config';
import { CategoryController } from './category/category.controller';
import { BasketController } from './basket/basket.controller';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      synchronize: true, // TODO: set to false in production
    }),
    AuthModule,
    BasketModule,
    CategoryModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
  controllers: [CategoryController, BasketController, OrderController, ProductController, UserController, AuthController],
})
export class AppModule {}
