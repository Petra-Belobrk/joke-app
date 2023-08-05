import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { EncryptionUtils } from '../_utils/encryption.utils';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(createDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.findByEmail(createDto.email);
    if (user) throw new BadRequestException('User already exists');
    const password = await EncryptionUtils.hashPassword(createDto.password);
    return this.userRepository
      .save({
        ...createDto,
        password,
      })
      .then((resp) => plainToInstance(ResponseUserDto, resp));
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
