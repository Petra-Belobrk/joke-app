import { Injectable } from '@nestjs/common';
import MailTransporter from '../mail/MailTransporter';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class JokeService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async sendJoke(email: string): Promise<void> {
    const joke = await this.fetchJoke();
    const transport = new MailTransporter(this.configService);

    transport.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to: email,
      subject: 'Your random joke',
      text: joke,
    });
  }

  async fetchJoke(): Promise<string> {
    return await this.httpService.axiosRef
      .get(this.configService.get<string>('JOKE_API'))
      .then((res) => res.data.value);
  }
}
