import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { ResponseUserDto } from './dto/response.user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() payload: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.register(payload);
  }
}
