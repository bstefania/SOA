import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInCredentialsDto } from './dto/log-in-credentials.dto';
import { AuthGuard } from './guards/AuthGuard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject('TASK_MANAGEMENT') private readonly client: ClientProxy,
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/hello')
  getHello(): string {
    return 'HI';
  }

  // @Get('/item/:id')
  // getById(@Param('id') id: number) {
  //   return this.appService.getItemById(id);
  // }

  // @Post()
  // create(@Body() createTaskDto) {
  //   return this.appService.createTask(createTaskDto);
  // }

  // @Get('/user')
  // getUser(@Body() data: any) {
  //   return this.appService.getUser(data);
  // }

  @Post('/signUp')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    console.log(authCredentialsDto);
    return this.appService.signUp(authCredentialsDto);
  }

  @Post('/logIn')
  async logIn(
    @Body() logInCredentialsDto: LogInCredentialsDto,
  ): Promise<{ userId: string; accessToken: string }> {
    return this.appService.logIn(logInCredentialsDto);
  }
}
