import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client = new Redis();

  async set(key: string, value: any) {
    await this.client.set(key, value);
  }

  async get(key: string) {
    return this.client.get(key);
  }
}