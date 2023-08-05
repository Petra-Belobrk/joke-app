import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  id: string;
  email: string;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @Exclude()
  password: string;
}
