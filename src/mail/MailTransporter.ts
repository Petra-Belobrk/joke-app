import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export default class MailTransporter {
  transporter: Transporter;
  configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.init();
  }

  async init() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_FROM'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }
}
