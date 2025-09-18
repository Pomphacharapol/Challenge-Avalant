import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Order } from '../orders/entities/order.entity';
import { User } from './entities/user.entity';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  providers: [UsersService, OrdersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
