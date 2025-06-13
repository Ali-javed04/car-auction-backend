import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { QueueModule } from 'src/queue/queue.module';
import { RedisModule } from 'src/redis/redis.module';
import { AuctionsGateway } from './auctions.gateway';
import { AuctionsService } from './auctions.service';


@Module({
  providers: [AuctionsGateway, AuctionsService],
  imports: [PrismaModule, RedisModule, QueueModule],
})
export class AuctionsModule {}