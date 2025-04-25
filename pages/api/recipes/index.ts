import { getGeneratedRecipes } from "@/domains/recipe/application/recipeService";
import { RecipeInput } from "@/domains/recipe/domain/types";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const input: RecipeInput = req.body;
      const recipes = await getGeneratedRecipes(input);
      res.status(200).json(recipes);
    } catch (error) {
      console.error("Error generating recipes: " + error);
      res.status(500).json({ error: "Failed to genrate recipes" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default handler;
