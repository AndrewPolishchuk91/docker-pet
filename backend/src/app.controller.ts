import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { DatabaseService } from './database/database.service.js';
import { RedisService } from './redis/redis.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db')
  async getDatabaseInfo() {
    const result = await this.databaseService.query<{
      database: string;
      username: string;
    }>(
      'SELECT current_database() AS database, current_user AS username',
    );

    return result.rows[0];
  }

  @Get('redis')
  async getRedisInfo() {
    await this.redisService.set('docker_test', 'Hello from NestJS');

    return {
      value: await this.redisService.get('docker_test'),
    };
  }
  
}