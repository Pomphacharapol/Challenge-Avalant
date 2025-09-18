import { Controller, Get, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('api/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  // GET /api/quotes/snapshot?symbols=AAPL,MSFT
  @Get('snapshot')
  getSnapshot(@Query('symbols') symbols: string) {
    const list = symbols.split(',');
    return this.quotesService.getSnapshot(list);
  }
}
