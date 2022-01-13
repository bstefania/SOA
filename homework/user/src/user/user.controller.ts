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
    console.log(authCredentialsDto);
    const user = await this.userService.signUp(authCredentialsDto);
    return user;
  }

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getUser(@Payload() data): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }
}
