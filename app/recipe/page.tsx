"use client";

import { generateRecipe } from "@/domains/recipe/application/recipeService";
import {
  DietaryRestriction,
  Ingredient,
  Recipe,
  Tool,
} from "@/domains/recipe/domain/types";
import { useState } from "react";

const RESTRICTIONS: DietaryRestriction[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "nut-free",
  "halal",
  "kosher",
];

export default function RecipePage() {
  // tools state
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [restrictions, setRestrictions] = useState<DietaryRestriction[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // input state
  const [ingredientInput, setIngredientInput] = useState("");
  const [toolInput, setToolInput] = useState("");

  const addIngredient = () => {
    if (ingredientInput.trim() === "") return;
    setIngredients([...ingredients, { name: ingredientInput }]);
    setIngredientInput("");
  };

  const addTool = () => {
    if (toolInput.trim() === "") return;
    setTools([...tools, { name: toolInput }]);
    setToolInput("");
  };

  const toggleRestriction = (r: DietaryRestriction) => {
    setRestrictions((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const handleGenerate = async () => {
    const input = { ingredients, tools, restrictions };
    const res = await generateRecipe(input);
    setRecipe(res);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🧑‍🍳 Recipe Generator</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Ingredients</label>
        <div className="flex gap-2 mb-2">
          <input
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            className="border p-2 flex-1"
            placeholder="e.g. Tomato"
          />
          <button
            onClick={addIngredient}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-6 text-sm">
          {ingredients.map((ing, idx) => (
            <li key={idx}>{ing.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Tools</label>
        <div className="flex gap-2 mb-2">
          <input
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            className="border p-2 flex-1"
            placeholder="e.g. Frying Pan"
          />
          <button
            onClick={addTool}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-6 text-sm">
          {tools.map((tool, idx) => (
            <li key={idx}>{tool.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Dietary Restrictions</label>
        <div className="flex flex-wrap gap-2">
          {RESTRICTIONS.map((r) => (
            <button
              key={r}
              onClick={() => toggleRestriction(r)}
              className={`px-3 py-1 rounded border ${
                restrictions.includes(r) ? "bg-green-500 text-white" : ""
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-6 py-2 rounded mt-4"
      >
        Generate Recipe
      </button>

      {recipe && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          <p className="mb-2">{recipe.description}</p>
          <p className="font-semibold">Ingredients:</p>
          <ul className="list-disc pl-6 mb-2">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing.name}</li>
            ))}
          </ul>
          <p className="font-semibold">Steps:</p>
          <ol className="list-decimal pl-6 mb-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <p className="text-sm text-gray-500">
            Estimated Time: {recipe.estimatedTime}
          </p>
        </div>
      )}
    </div>
  );
}
