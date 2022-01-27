import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  catchError,
  firstValueFrom,
  throwError,
} from 'rxjs';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInCredentialsDto } from './dto/log-in-credentials.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('RECIPES_CLIENT')
    private readonly recipes_client: ClientProxy,
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
          console.log(err.message)
          return throwError(() => err);
        }),
      );

    return firstValueFrom(source).catch((err) => {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        console.log(err)
        throw new InternalServerErrorException();
      }
    });
  }

  async logIn(
    logInCredentialsDto: LogInCredentialsDto,
  ): Promise<{ userId: string; accessToken: string }> {
    const source = this.auth_client
      .send({ role: 'auth', cmd: 'log-in' }, logInCredentialsDto)
      .pipe(
        catchError((err) => {
          console.log(err.message)
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

  async createRecipe(createRecipeDto) {
    const recipe_pr_obs = await this.recipes_client.send({ role: 'recipes', cmd: 'post' }, createRecipeDto)
    return firstValueFrom(recipe_pr_obs);
  }

  async getRecipes(filterRecipeDto) {
    return this.recipes_client.send({ role: 'recipes', cmd: 'get' }, filterRecipeDto)
  }

  async getRecipeById(id) {
    return this.recipes_client.send({ role: 'recipes', cmd: 'get-by-id' }, id);
  }

  // mailer -----------------------------------------------------

  async sendMail(mailDto) {
    return this.user_client.send({role: 'mail', cmd: 'send'}, mailDto);
  }

}
