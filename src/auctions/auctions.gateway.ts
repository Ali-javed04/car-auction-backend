import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuctionsService } from './auctions.service';

@WebSocketGateway({ cors: true })
export class AuctionsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly auctionsService: AuctionsService) {}

  @SubscribeMessage('joinAuction')
  handleJoinAuction(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.join(data.auctionId);
  }

  @SubscribeMessage('placeBid')
  async handlePlaceBid(@MessageBody() bid: any) {
    const result = await this.auctionsService.placeBid(bid);
    this.server.to(bid.auctionId).emit('bidUpdate', result);
  }

  @SubscribeMessage('auctionEnd')
  handleAuctionEnd(@MessageBody() data: any) {
    this.server.to(data.auctionId).emit('auctionEnded', data);
  }
}