import { Controller, Get, Query, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /api/users?page=&pageSize=&search=&sortBy=&sortDir=
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 50,
    @Query('search') search: string = '',
    @Query('sortBy') sortBy: string = 'id',
    @Query('sortDir') sortDir: 'asc' | 'desc' = 'asc',
  ) {
    return this.usersService.findUsers(page, pageSize, search, sortBy, sortDir);
  }

  // GET /api/users/:id/orders
  @Get(':id/orders')
  async getUserOrders(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 50,
  ) {
    return this.usersService.findOrdersByUser(id, page, pageSize);
  }
}
