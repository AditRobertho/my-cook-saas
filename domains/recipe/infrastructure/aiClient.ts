import { Recipe, RecipeInput } from "../domain/types";

export async function generateRecipes(input: RecipeInput): Promise<Recipe[]> {
  const mockRecipes: Recipe[] = [
    {
      title: "Mock recipe",
      description: "A delicious recipe",
      ingredients: input.ingredients,
      steps: ["step 1", "step 2"],
      estimatedTime: "30 minutes",
    },
  ];
  return mockRecipes;
}
