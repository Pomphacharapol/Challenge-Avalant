import { Module } from '@nestjs/common';
import { OrdersModule } from '../../orders/orders.module';
import { ProductsModule } from '../../products/products.module';
import { UsersModule } from '../../users/users.module';
import { DevSeedController } from './seed.controller';
import { DevSeedService } from './seed.service';

@Module({
  imports: [UsersModule, OrdersModule, ProductsModule],
  providers: [DevSeedService],
  controllers: [DevSeedController],
})
export class DevSeedModule {}
