import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { QueueService } from 'src/queue/queue.service';
import { RedisService } from 'src/redis/redis.service';


@Injectable()
export class AuctionsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private queue: QueueService,
  ) {}

  async placeBid(bid: any) {
    const highestBid = await this.redis.get(`auction:${bid.auctionId}`);
    if (highestBid && Number(bid.amount) <= Number(highestBid)) return { error: 'Bid too low' };

    const result = await this.prisma.$transaction(async (tx) => {
      const newBid = await tx.bid.create({ data: bid });
      await tx.auction.update({
        where: { id: bid.auctionId },
        data: { currentBid: bid.amount, winnerId: bid.userId },
      });
      return newBid;
    });

    await this.redis.set(`auction:${bid.auctionId}`, bid.amount);
    await this.queue.publish('bidQueue', bid);
    return result;
  }
}