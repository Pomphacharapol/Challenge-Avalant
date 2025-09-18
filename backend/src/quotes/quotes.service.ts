import { Injectable } from '@nestjs/common';

export interface Quote {
  symbol: string;
  price: number;
  ts: string;
}

@Injectable()
export class QuotesService {
  private quotes: Map<string, number> = new Map();

  constructor() {
    // สร้าง sample symbols
    ['AAPL', 'MSFT', 'GOOG', 'TSLA', 'AMZN'].forEach(sym => {
      this.quotes.set(sym, 100 + Math.random() * 100);
    });
  }

  getSnapshot(symbols: string[]): Quote[] {
    return symbols.map(symbol => ({
      symbol,
      price: this.quotes.get(symbol) || 0,
      ts: new Date().toISOString(),
    }));
  }

  updateRandomQuotes() {
    for (const symbol of this.quotes.keys()) {
      // random walk
      const delta = (Math.random() - 0.5) * 2;
      this.quotes.set(symbol, Math.max(0, (this.quotes.get(symbol) || 0) + delta));
    }
    return Array.from(this.quotes.entries()).map(([symbol, price]) => ({
      symbol,
      price,
      ts: new Date().toISOString(),
    }));
  }
}
