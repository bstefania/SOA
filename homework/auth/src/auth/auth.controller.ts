import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LogInCredentialsDto } from './dto/log-in-credentials.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'log-in' })
  async logIn(
    @Payload() data: LogInCredentialsDto,
  ): Promise<{ userId: string; accessToken: string }> {
    return this.authService.logIn(data);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data) {
    try {
      return this.authService.validateToken(data.jwt);
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
