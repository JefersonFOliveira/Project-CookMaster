const express = require('express');
const bodyParser = require('body-parser');
const userControllers = require('../controllers/userControllers');
const recipeControllers = require('../controllers/recipesControllers');
const { authValidate } = require('./auth/validateJwt');
const error = require('./middlewares/errosMid');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', userControllers.getUserController);
app.post('/login', userControllers.getLoginController);
app.post('/recipes', authValidate, recipeControllers.createRecipesCont);
app.get('/recipes', recipeControllers.getAllCont);
app.get('/recipes/:id', recipeControllers.getByIdCont);
app.put('/recipes/:id', authValidate, recipeControllers.updateRecipeCont);
app.use(error);

module.exports = app;
