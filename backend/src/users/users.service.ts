import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly ordersService: OrdersService,
  ) {}

  async findUsers(
    page = 1,
    pageSize = 50,
    search = '',
    sortBy = 'id',
    sortDir: 'asc' | 'desc' = 'asc',
  ) {
    const qb = this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.orders', 'order');

    if (search)
      qb.where('user.name ILIKE :search OR user.email ILIKE :search', {
        search: `%${search}%`,
      });

    qb.loadRelationCountAndMap('user.orderCount', 'user.orders')
      .addSelect('COALESCE(SUM(order.amount),0)', 'orderTotal')
      .groupBy('user.id');

    if (sortBy === 'orderTotal')
      qb.orderBy('orderTotal', sortDir.toUpperCase() as 'ASC' | 'DESC');
    else qb.orderBy(`user.${sortBy}`, sortDir.toUpperCase() as 'ASC' | 'DESC');

    qb.skip((page - 1) * pageSize).take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  async findOrdersByUser(userId: string, page = 1, pageSize = 50) {
    return this.ordersService.findOrdersByUser(userId, page, pageSize);
  }
}
