import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './src/recipes/recipe.entity';
import { RecipesModule } from './src/recipes/recipes.module';

@Module({
  imports: [
    RecipesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'recipes-db',   // recipes-db   localhost
      port: 5433, // 5433  5432
      username: 'postgres',
      password: 'postgres',
      database: 'recipes-microservice',
      synchronize: true,
      entities: [Recipe],
    }),
  ],
})
export class AppModule {}
