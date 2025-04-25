import { Recipe, RecipeInput } from "../domain/types";
import { generateRecipes } from "../infrastructure/aiClient";

export async function getGeneratedRecipes(
  input: RecipeInput
): Promise<Recipe[]> {
  const recipe = await generateRecipes(input);

  return recipe;
}
