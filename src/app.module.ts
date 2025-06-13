import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuctionsModule } from './auctions/auctions.module';
import { QueueModule } from './queue/queue.module';
import { RedisModule } from './redis/redis.module';


@Module({
  
  imports: [AuctionsModule, PrismaModule, RedisModule, QueueModule],
})
export class AppModule {}