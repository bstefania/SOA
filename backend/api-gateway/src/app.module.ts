import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'auth-svc',  // auth-svc 
          port: 3002,
        },
      },
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'user-svc', // user-svc
          port: 3001,
        },
      },
      {
        name: 'RECIPES_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'recipes-svc',  // recipes-svc
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
