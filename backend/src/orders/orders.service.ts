import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private ordersRepo: Repository<Order>) {}

  async findOrdersByUser(userId: string, page = 1, pageSize = 50) {
    const [items, total] = await this.ordersRepo.findAndCount({
      where: { userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });
    return { items, total, page, pageSize };
  }
}
