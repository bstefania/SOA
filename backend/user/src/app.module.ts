import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'user-db',  // user-db localhost
      port: 5434,  // 5434 5432
      username: 'postgres',
      password: 'postgres',
      database: 'user-microservice',
      synchronize: true,
      entities: [User],
    }),
  ],
})
export class AppModule {}
