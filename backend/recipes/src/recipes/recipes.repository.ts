import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@EntityRepository(Recipe)
export class RecipesRepository extends Repository<Recipe> {
  async getRecipes(filterDto): Promise<Recipe[]> {
    // const { status, search } = filterDto;

    const query = this.createQueryBuilder('recipe');
    query.where(filterDto);

    const recipes = await query.getMany();
    return recipes;
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const found = await this.findOne({ where: { id } });
    return found;
  }

  async createRecipe(createRecipeDto, userId: string): Promise<Recipe> {
    console.log(createRecipeDto)
    const { name, description, preparationTime, imageName } = createRecipeDto;

    const recipe = this.create({
      name,
      description,
      preparationTime,
      imageName,
      userId,
    });

    await this.save(recipe);
    return recipe;
  }
}
