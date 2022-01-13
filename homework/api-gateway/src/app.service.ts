import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  catchError,
  first,
  firstValueFrom,
  throwError,
  TimeoutError,
} from 'rxjs';
import { threadId } from 'worker_threads';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInCredentialsDto } from './dto/log-in-credentials.dto';

@Injectable()
export class AppService {
  constructor(
    // @Inject('TASK_MANAGEMENT') private readonly client: ClientProxy,
    @Inject('USER_CLIENT')
    private readonly user_client: ClientProxy,
    @Inject('AUTH_CLIENT')
    private readonly auth_client: ClientProxy,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const source = this.user_client
      .send({ role: 'user', cmd: 'sign-up' }, authCredentialsDto)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
      );

    return firstValueFrom(source).catch((err) => {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    });
  }

  async logIn(
    logInCredentialsDto: LogInCredentialsDto,
  ): Promise<{ userId: string; accessToken: string }> {
    console.log(logInCredentialsDto);
    const source = this.auth_client
      .send({ role: 'auth', cmd: 'log-in' }, logInCredentialsDto)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
      );

    return firstValueFrom(source).catch((err) => {
      if (err.code === '401') {
        throw new UnauthorizedException(err.message);
      } else {
        throw new InternalServerErrorException();
      }
    });
  }

  // getUser(data) {
  //   return this.client.send({ role: 'user', cmd: 'get' }, data);
  // }

  // createItem(createItemDto) {
  //   return this.client.send({ role: 'item', cmd: 'create' }, createItemDto);
  // }

  // getItemById(id: number) {
  //   return this.client.send({ role: 'item', cmd: 'get-by-id' }, id);
  // }

  // createTask(createTaskDto) {
  //   return this.client.send({ role: 'task', cmd: 'create' }, createTaskDto);
  // }
}
