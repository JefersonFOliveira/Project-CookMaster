const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: result.insertedId } };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes')
  .find({}).toArray();

  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const editedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  // console.log(editedRecipe);
  return editedRecipe;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const updateImage = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });
  const recipe = await getById(id);
  return recipe;
};

module.exports = {
  createRecipes,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  updateImage,
};
