import { Controller, Get, Query, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /api/orders?userId=&page=&pageSize=
  @Get()
  async getOrders(
    @Query('userId') userId: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 50,
  ) {
    return this.ordersService.findOrdersByUser(userId, page, pageSize);
  }

  // GET /api/orders/:id
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.findOrdersByUser(id, 1, 1); // placeholder
  }
}
