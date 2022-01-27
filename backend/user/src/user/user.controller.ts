import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ role: 'user', cmd: 'sign-up' })
  async signUp(@Payload() authCredentialsDto: AuthCredentialsDto) {
    return this.userService.signUp(authCredentialsDto);
  }

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getUser(@Payload() data): Promise<User> {
    console.log(data)
    return this.userService.findOne({ username: data.username });
  }

  @MessagePattern({role: 'mail', cmd: 'send' })
  async sendMail(@Payload() data) {
    console.log(data);
    return this.userService.sendMail(data);
  }
}
