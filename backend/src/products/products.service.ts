import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async createMany(products: Partial<Product>[]) {
    return this.productsRepo.save(products);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepo.findOneBy({ id });
  }
}
