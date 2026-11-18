import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client = createClient({
    url: `redis://${process.env.REDIS_HOST ?? 'redis'}:${process.env.REDIS_PORT ?? 6379}`,
  });

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async get(key: string) {
    return this.client.get(key);
  }
}