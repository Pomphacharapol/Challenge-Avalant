import { WebSocketGateway, SubscribeMessage, WebSocketServer, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuotesService } from './quotes.service';

@WebSocketGateway({ path: '/ws/quotes', cors: { origin: '*' } })
export class QuotesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clients: Map<string, string[]> = new Map(); // socketId -> symbols
  private interval: NodeJS.Timer;

  constructor(private readonly quotesService: QuotesService) {}

  afterInit() {
    this.interval = setInterval(() => this.broadcast(), 1000 / 10); // 10 updates/sec
  }

  handleConnection(client: Socket) {
    this.clients.set(client.id, []);
    client.on('subscribe', (data: { symbols: string[] }) => {
      this.clients.set(client.id, data.symbols);
    });
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  private broadcast() {
    const updates = this.quotesService.updateRandomQuotes();
    for (const [socketId, symbols] of this.clients.entries()) {
      const filtered = updates.filter(u => symbols.includes(u.symbol));
      if (filtered.length > 0) {
        this.server.to(socketId).emit('quotes', filtered);
      }
    }
  }
}
