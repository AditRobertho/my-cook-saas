import { Recipe, RecipeInput } from "../domain/types";

// Replace later by OpenAI call
export async function generateRecipe(input: RecipeInput): Promise<Recipe> {
  const { ingredients, tools, restrictions } = input;

  // basic placeholder logic flow
  const exampleRecipe: Recipe = {
    title: "Simple Stir-Fry",
    description: "A quick and easy stir-fry based on what you have.",
    steps: [
      "Chop all the ingredients.",
      "Heat oil in a pan.",
      `Add ingredients using your available tools: 
        ${tools.map((t) => t.name).join(", ")}.`,
      "Stir-fry for 10 minutes.",
      "Serve hot.",
    ],
    estimatedTime: "20 minutes",
  };

  return exampleRecipe;
}
