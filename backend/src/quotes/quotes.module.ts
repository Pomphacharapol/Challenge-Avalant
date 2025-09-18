import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { QuotesGateway } from './quotes.gateway';

@Module({
  providers: [QuotesService, QuotesGateway],
  controllers: [QuotesController]
})
export class QuotesModule {}
