import { Controller, Post, Query } from '@nestjs/common';
import { DevSeedService } from './seed.service';

@Controller('dev')
export class DevSeedController {
  constructor(private readonly devSeedService: DevSeedService) {}

  @Post('seed')
  async seed(
    @Query('users') users: number,
    @Query('orders') orders: number,
    @Query('products') products: number,
  ) {
    return this.devSeedService.seed(
      users || 5000,
      orders || 50000,
      products || 1000,
    );
  }
}
