const recipesServices = require('../services/recipesServices');

const createRecipesCont = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesServices.createRecipeService(name, ingredients, preparation, _id);
    return res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllCont = async (_req, res) => {
  const recipes = await recipesServices.getAllService();
  return res.status(200).json(recipes);
};

const getByIdCont = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeId = await recipesServices.getByIdService(id);
    return res.status(200).json(recipeId);
  } catch (error) {
    next(error);
  }
};

const updateRecipeCont = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = await recipesServices
  .updateRecipeService(id, name, ingredients, preparation);
  return res.status(200).json(editedRecipe);
};

module.exports = {
  createRecipesCont,
  getAllCont,
  getByIdCont,
  updateRecipeCont,
};
