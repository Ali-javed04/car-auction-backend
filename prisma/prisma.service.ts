import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Type-safe event listener
    (this as unknown as { $on: (event: string, callback: () => Promise<void>) => void }).$on(
      'beforeExit',
      async () => {
        await app.close();
      }
    );
  }
}