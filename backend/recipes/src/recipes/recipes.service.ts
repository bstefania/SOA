import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipesRepository } from './recipes.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipesRepository)
    private recipesRepository: RecipesRepository,
  ) {}

  createRecipe(createRecipeDto): Promise<Recipe> {
    const { userId } = createRecipeDto
    console.log("create recipe")
    return this.recipesRepository.createRecipe(createRecipeDto, userId);
  }

  getRecipes(filterDto): Promise<Recipe[]> {
    return this.recipesRepository.getRecipes(filterDto);
  }

  getRecipeById(id: string): Promise<Recipe> {
    console.log(id)
    return this.recipesRepository.getRecipeById(id);
  }


  // async deleteRecipe(id: string, user_id): Promise<void> {
  //   const result = await this.recipesRepository.delete({ id, user_id });

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Recipe with ID "${id}" not found`);
  //   }
  // }

  // async updateRecipeStatus(
  //   id: string,
  //   status: RecipeStatus,
  //   user: User,
  // ): Promise<Recipe> {
  //   const recipe = await this.getRecipeById(id, user);

  //   recipe.status = status;
  //   await this.recipesRepository.save(recipe);

  //   return recipe;
  // }
}
