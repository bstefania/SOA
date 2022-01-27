import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './recipes.controller';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';
import { RecipesRepository } from './recipes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipesRepository]),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'auth-svc', // auth-svc
          port: 3002,
        },
      },
    ]),
  ],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
