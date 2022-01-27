import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    SendGrid.setApiKey("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");
  }

  signUp(authCredentialsDto: AuthCredentialsDto) {
    const { email } = authCredentialsDto
    return this.usersRepository.createUser(authCredentialsDto)
    .then((user) => {
      console.log(email);
      const mail = {
        to: email,
        from: 'bogdanstefania17@gmail.com',
        subject: "Welcome at Recipes App",
        text: "Hello! Thanks for joining our world of recipes. We hope you'll find what you're looking for!",
        html: '<strong>Hello! Thanks for joining our world of recipes. We hope you\'ll find what you\'re looking for!</strong>'
      }
      this.sendMail(mail);
      return user;
    })
  }

  findOne(query: FindConditions<User>) {
    return this.usersRepository.findOne(query);
  }

  async sendMail(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
