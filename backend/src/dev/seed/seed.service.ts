import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DevSeedService {
  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  async seed(users = 5000, orders = 50000, products = 1000) {
    faker.seed(123);

    // Products
    const productList = [];
    for (let i = 0; i < products; i++) {
      productList.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
      });
    }
    await this.productsService.createMany(productList);

    // Users
    const userList = [];
    for (let i = 0; i < users; i++) {
      userList.push({
        name: faker.person.fullName(), // แก้จาก findName()
        email: faker.internet.email(),
      });
    }
    await this.usersService['usersRepo'].save(userList);

    // Orders
    const orderList = [];
    for (let i = 0; i < orders; i++) {
      orderList.push({
        userId: faker.number.int({ min: 1, max: users }), // แก้จาก datatype.number()
        productId: faker.number.int({ min: 1, max: products }), // แก้จาก datatype.number()
        amount: parseFloat(faker.commerce.price()),
      });
      if (i % 10000 === 0) console.log(`Seeded ${i} orders`);
    }
    await this.ordersService['ordersRepo'].save(orderList);

    return { users, products, orders };
  }
}
