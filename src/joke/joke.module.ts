import { Module } from '@nestjs/common';
import { JokeController } from './joke.controller';
import { JokeService } from './joke.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [JokeController],
  providers: [JokeService],
})
export class JokeModule {}
