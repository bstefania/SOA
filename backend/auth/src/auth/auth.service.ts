import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log(username);
    const user = await this.client
      .send({ role: 'user', cmd: 'get' }, { username })
      .pipe(
        timeout(5000),
        catchError(() => {
          throw new RpcException({
            message: 'Internal server error.',
            code: '500',
          });
        }),
      )
      .toPromise();

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async logIn(userDto) {
    const { username, password } = userDto;
    console.log(userDto)
    const user = await this.client
      .send({ role: 'user', cmd: 'get' }, { username })
      // .pipe(
      //   timeout(5000),
      //   catchError(() => {
      //     throw new RpcException({
      //       message: 'Internal server error.',
      //       code: '500',
      //     });
      //   }),
      // )
      .toPromise();

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { user, sub: user.id };
      return {
        userId: user.id,
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new RpcException({
        message: 'Please check your login credentials',
        code: '401',
      });
    }
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
