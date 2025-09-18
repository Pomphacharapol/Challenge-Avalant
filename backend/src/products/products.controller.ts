import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /api/products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // GET /api/products/:id
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  // POST /api/products (สำหรับ DevSeed หรือ test)
  @Post()
  async createProduct(@Body() body: Partial<Product>) {
    return this.productsService.createMany([body]);
  }
}
