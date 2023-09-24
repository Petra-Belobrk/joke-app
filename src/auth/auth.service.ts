import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EncryptionUtils } from '../_utils/encryption.utils';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string): Promise<TokenDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();

    const passMatch = await EncryptionUtils.validatePassword(
      password,
      user.password,
    );

    if (!passMatch) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
