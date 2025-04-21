// Ingredient model
export interface Ingredient {
  name: string;
  quantity?: string;
}

// Tool model
export interface Tool {
  name: string;
}

// Dietary restrictions
export type DietaryRestriction =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "halal"
  | "kosher";

// User input model for recipe suggestion
export interface RecipeInput {
  ingredients: Ingredient[];
  tools: Tool[];
  restrictions: DietaryRestriction[];
}

// Recipe output model
export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  estimatedTime: string;
}
