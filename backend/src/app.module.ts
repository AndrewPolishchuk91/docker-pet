import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseService } from './database/database.service.js';
import { RedisService } from './redis/redis.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DatabaseService, RedisService],
})

export class AppModule {}