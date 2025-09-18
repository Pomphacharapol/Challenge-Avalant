import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { DevSeedModule } from './dev/seed/seed.module';
import { NodesModule } from './nodes/nodes.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT! || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'challenge',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    ProductsModule,
    DevSeedModule,
    NodesModule,
    QuotesModule,
  ],
})
export class AppModule {}
