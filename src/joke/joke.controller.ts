import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../_decorator/current-user.decorator';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../_guards/jwt-auth.guard';
import { JokeService } from './joke.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('joke')
@ApiTags('Joke')
export class JokeController {
  constructor(private jokeService: JokeService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sends random joke to user email' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Successfully sent' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sendJoke(@CurrentUser() user: User): Promise<void> {
    return this.jokeService.sendJoke(user.email);
  }
}
