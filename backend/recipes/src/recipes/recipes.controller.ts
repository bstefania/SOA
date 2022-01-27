import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @MessagePattern({ role: 'recipes', cmd: 'post'})
  async createRecipe(@Payload() data): Promise<Recipe> {
    return this.recipesService.createRecipe(data);
  }

  @MessagePattern({ role: 'recipes', cmd: 'get'})
  async getRecipes(@Payload() data): Promise<Recipe[]> {
    return this.recipesService.getRecipes(data);
  }

  @MessagePattern({ role: 'recipes', cmd: 'get-by-id'})
  async getRecipeById(@Payload() data): Promise<Recipe> {
    return this.recipesService.getRecipeById(data);
  }
}
