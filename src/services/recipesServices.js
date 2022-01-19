const recipesModel = require('../models/recipesModel');
const errorMes = require('../api/utils/errorMes');

const createRecipeService = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    throw errorMes(400, 'Invalid entries. Try again.');
  }
  const recipe = await recipesModel.createRecipes(name, ingredients, preparation, userId);
  return recipe;
};

const getAllService = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getByIdService = async (id) => {
  const recipeId = await recipesModel.getById(id);
  if (!recipeId) {
    throw errorMes(404, 'recipe not found');
  }
  return recipeId;
};

const updateRecipeService = async (id, name, ingredients, preparation) => {
  const editedRecipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  return editedRecipe;
};

const deleteRecipeService = async (id) => {
  const recipe = await recipesModel.deleteRecipe(id);
  return recipe;
};

const updateImageService = async ({ id, image }) => {
  const recipe = await recipesModel.updateImage(id, image);
  return recipe;
};

module.exports = {
  createRecipeService,
  getAllService,
  getByIdService,
  updateRecipeService,
  deleteRecipeService,
  updateImageService,
};
