import { Injectable } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class QueueService {
  private channel: Channel;

  async publish(queue: string, message: any) {
    if (!this.channel) await this.connect();
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  private async connect() {
    const conn = await connect('amqp://localhost');
    this.channel = await conn.createChannel();
    await this.channel.assertQueue('bidQueue', { durable: true });
  }
}