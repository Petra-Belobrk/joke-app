import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class EncryptionUtils {
  static async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return await hash(password, salt);
  }

  static async validatePassword(
    password: string,
    hashedPwd: string,
  ): Promise<boolean> {
    return await compare(password, hashedPwd);
  }
}
